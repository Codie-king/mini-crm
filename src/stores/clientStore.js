import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useClientStore = create(
  persist(
    (set, get) => ({
      clients: [
        {
          id: '1',
          name: 'John Smith',
          email: 'john.smith@company.com',
          phone: '+1 (555) 123-4567',
          company: 'Tech Solutions Inc.',
          status: 'active',
          tags: ['tech', 'enterprise'],
          notes: 'Key decision maker for enterprise solutions.',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah.j@startup.co',
          phone: '+1 (555) 987-6543',
          company: 'StartupXYZ',
          status: 'active',
          tags: ['startup', 'saas'],
          notes: 'Interested in our SaaS platform.',
          createdAt: '2024-01-10T14:30:00Z',
          updatedAt: '2024-01-12T09:15:00Z'
        },
        {
          id: '3',
          name: 'Mike Wilson',
          email: 'mike.wilson@corp.com',
          phone: '+1 (555) 456-7890',
          company: 'Corporate Ltd.',
          status: 'inactive',
          tags: ['corporate', 'legacy'],
          notes: 'Previous customer, may re-engage.',
          createdAt: '2023-12-20T11:45:00Z',
          updatedAt: '2024-01-05T16:20:00Z'
        }
      ],
      searchTerm: '',
      statusFilter: 'all',
      tagFilter: 'all',

      // Actions
      addClient: (client) => {
        const newClient = {
          ...client,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set((state) => ({
          clients: [...state.clients, newClient]
        }));
      },

      updateClient: (id, updates) => {
        set((state) => ({
          clients: state.clients.map((client) =>
            client.id === id
              ? { ...client, ...updates, updatedAt: new Date().toISOString() }
              : client
          )
        }));
      },

      deleteClient: (id) => {
        set((state) => ({
          clients: state.clients.filter((client) => client.id !== id)
        }));
      },

      setSearchTerm: (term) => set({ searchTerm: term }),
      setStatusFilter: (status) => set({ statusFilter: status }),
      setTagFilter: (tag) => set({ tagFilter: tag }),

      // Computed values
      getFilteredClients: () => {
        const { clients, searchTerm, statusFilter, tagFilter } = get();
        
        return clients.filter((client) => {
          const matchesSearch = searchTerm === '' || 
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.company.toLowerCase().includes(searchTerm.toLowerCase());
          
          const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
          const matchesTag = tagFilter === 'all' || client.tags.includes(tagFilter);
          
          return matchesSearch && matchesStatus && matchesTag;
        });
      },

      getClientById: (id) => {
        const { clients } = get();
        return clients.find((client) => client.id === id);
      },

      getAllTags: () => {
        const { clients } = get();
        const allTags = clients.flatMap((client) => client.tags);
        return [...new Set(allTags)];
      }
    }),
    {
      name: 'crm-clients',
      partialize: (state) => ({ clients: state.clients })
    }
  )
);

export default useClientStore; 