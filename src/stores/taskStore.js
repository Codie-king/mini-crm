import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: [
        {
          id: '1',
          title: 'Follow up on proposal',
          description: 'Call John Smith to discuss the enterprise software proposal.',
          priority: 'high',
          status: 'todo',
          dueDate: '2024-01-20T17:00:00Z',
          clientId: '1',
          clientName: 'John Smith',
          leadId: '1',
          leadTitle: 'Enterprise Software License',
          assignedTo: 'Sales Team',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        },
        {
          id: '2',
          title: 'Prepare demo for StartupXYZ',
          description: 'Create demo presentation for SaaS platform.',
          priority: 'medium',
          status: 'in_progress',
          dueDate: '2024-01-18T17:00:00Z',
          clientId: '2',
          clientName: 'Sarah Johnson',
          leadId: '2',
          leadTitle: 'SaaS Platform Subscription',
          assignedTo: 'Product Team',
          createdAt: '2024-01-14T14:00:00Z',
          updatedAt: '2024-01-16T09:30:00Z'
        },
        {
          id: '3',
          title: 'Send follow-up email',
          description: 'Send follow-up email to Mike Wilson about legacy system upgrade.',
          priority: 'low',
          status: 'completed',
          dueDate: '2024-01-16T17:00:00Z',
          clientId: '3',
          clientName: 'Mike Wilson',
          leadId: '3',
          leadTitle: 'Legacy System Upgrade',
          assignedTo: 'Sales Team',
          createdAt: '2024-01-15T11:00:00Z',
          updatedAt: '2024-01-16T15:45:00Z'
        }
      ],
      viewMode: 'list', // 'list' or 'calendar'
      statusFilter: 'all',
      priorityFilter: 'all',
      clientFilter: 'all',

      // Actions
      addTask: (task) => {
        const newTask = {
          ...task,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set((state) => ({
          tasks: [...state.tasks, newTask]
        }));
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updates, updatedAt: new Date().toISOString() }
              : task
          )
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        }));
      },

      setViewMode: (mode) => set({ viewMode: mode }),
      setStatusFilter: (status) => set({ statusFilter: status }),
      setPriorityFilter: (priority) => set({ priorityFilter: priority }),
      setClientFilter: (clientId) => set({ clientFilter: clientId }),

      // Computed values
      getFilteredTasks: () => {
        const { tasks, statusFilter, priorityFilter, clientFilter } = get();
        
        return tasks.filter((task) => {
          const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
          const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
          const matchesClient = clientFilter === 'all' || task.clientId === clientFilter;
          
          return matchesStatus && matchesPriority && matchesClient;
        });
      },

      getTaskById: (id) => {
        const { tasks } = get();
        return tasks.find((task) => task.id === id);
      },

      getTasksByStatus: (status) => {
        const { tasks } = get();
        return tasks.filter((task) => task.status === status);
      },

      getTasksByClient: (clientId) => {
        const { tasks } = get();
        return tasks.filter((task) => task.clientId === clientId);
      },

      getTasksByLead: (leadId) => {
        const { tasks } = get();
        return tasks.filter((task) => task.leadId === leadId);
      },

      getOverdueTasks: () => {
        const { tasks } = get();
        const now = new Date();
        return tasks.filter((task) => 
          task.status !== 'completed' && 
          new Date(task.dueDate) < now
        );
      },

      getUpcomingTasks: () => {
        const { tasks } = get();
        const now = new Date();
        const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        return tasks.filter((task) => 
          task.status !== 'completed' && 
          new Date(task.dueDate) >= now &&
          new Date(task.dueDate) <= weekFromNow
        );
      },

      getTasksForDate: (date) => {
        const { tasks } = get();
        const targetDate = new Date(date);
        return tasks.filter((task) => {
          const taskDate = new Date(task.dueDate);
          return taskDate.toDateString() === targetDate.toDateString();
        });
      },

      getTaskStats: () => {
        const { tasks } = get();
        const total = tasks.length;
        const completed = tasks.filter(task => task.status === 'completed').length;
        const overdue = get().getOverdueTasks().length;
        const upcoming = get().getUpcomingTasks().length;
        
        return {
          total,
          completed,
          overdue,
          upcoming,
          completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
        };
      }
    }),
    {
      name: 'crm-tasks',
      partialize: (state) => ({ 
        tasks: state.tasks,
        viewMode: state.viewMode
      })
    }
  )
);

export default useTaskStore; 