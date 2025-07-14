import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useLeadStore = create(
  persist(
    (set, get) => ({
      leads: [
        {
          id: '1',
          title: 'Enterprise Software License',
          clientId: '1',
          clientName: 'John Smith',
          stage: 'proposal',
          value: 50000,
          priority: 'high',
          description: 'Large enterprise software license for Tech Solutions Inc.',
          contactPerson: 'John Smith',
          email: 'john.smith@company.com',
          phone: '+1 (555) 123-4567',
          notes: 'Follow up on proposal next week.',
          expectedCloseDate: '2024-02-15T00:00:00Z',
          createdAt: '2024-01-10T09:00:00Z',
          updatedAt: '2024-01-15T14:30:00Z'
        },
        {
          id: '2',
          title: 'SaaS Platform Subscription',
          clientId: '2',
          clientName: 'Sarah Johnson',
          stage: 'contacted',
          value: 12000,
          priority: 'medium',
          description: 'Annual SaaS platform subscription for StartupXYZ.',
          contactPerson: 'Sarah Johnson',
          email: 'sarah.j@startup.co',
          phone: '+1 (555) 987-6543',
          notes: 'Demo scheduled for next week.',
          expectedCloseDate: '2024-01-30T00:00:00Z',
          createdAt: '2024-01-12T11:00:00Z',
          updatedAt: '2024-01-14T16:45:00Z'
        },
        {
          id: '3',
          title: 'Legacy System Upgrade',
          clientId: '3',
          clientName: 'Mike Wilson',
          stage: 'new',
          value: 25000,
          priority: 'low',
          description: 'Upgrade existing legacy system for Corporate Ltd.',
          contactPerson: 'Mike Wilson',
          email: 'mike.wilson@corp.com',
          phone: '+1 (555) 456-7890',
          notes: 'Initial contact made, waiting for response.',
          expectedCloseDate: '2024-03-01T00:00:00Z',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        }
      ],

      // Actions
      addLead: (lead) => {
        const newLead = {
          ...lead,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set((state) => ({
          leads: [...state.leads, newLead]
        }));
      },

      updateLead: (id, updates) => {
        set((state) => ({
          leads: state.leads.map((lead) =>
            lead.id === id
              ? { ...lead, ...updates, updatedAt: new Date().toISOString() }
              : lead
          )
        }));
      },

      deleteLead: (id) => {
        set((state) => ({
          leads: state.leads.filter((lead) => lead.id !== id)
        }));
      },

      moveLead: (leadId, newStage) => {
        set((state) => ({
          leads: state.leads.map((lead) =>
            lead.id === leadId
              ? { ...lead, stage: newStage, updatedAt: new Date().toISOString() }
              : lead
          )
        }));
      },

      // Computed values
      getLeadsByStage: (stage) => {
        const { leads } = get();
        return leads.filter((lead) => lead.stage === stage);
      },

      getLeadById: (id) => {
        const { leads } = get();
        return leads.find((lead) => lead.id === id);
      },

      getPipelineValue: () => {
        const { leads } = get();
        return leads.reduce((total, lead) => total + lead.value, 0);
      },

      getStageValue: (stage) => {
        const { leads } = get();
        return leads
          .filter((lead) => lead.stage === stage)
          .reduce((total, lead) => total + lead.value, 0);
      },

      getLeadCount: (stage) => {
        const { leads } = get();
        return leads.filter((lead) => lead.stage === stage).length;
      },

      getLeadsByClient: (clientId) => {
        const { leads } = get();
        return leads.filter((lead) => lead.clientId === clientId);
      }
    }),
    {
      name: 'crm-leads',
      partialize: (state) => ({ leads: state.leads })
    }
  )
);

export default useLeadStore; 