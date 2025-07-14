import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, DollarSign, Calendar, User, Target, Edit, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import useLeadStore from '../stores/leadStore';
import useClientStore from '../stores/clientStore';
import useUIStore from '../stores/uiStore';
import LeadForm from '../components/LeadForm';

const Leads = () => {
  const { 
    leads, 
    getLeadsByStage, 
    moveLead, 
    deleteLead, 
    getPipelineValue, 
    getStageValue, 
    getLeadCount 
  } = useLeadStore();
  
  const { clients } = useClientStore();
  const { openModal, closeModal, activeModal, modalData } = useUIStore();

  const stages = [
    { id: 'new', title: 'New', color: 'bg-blue-500' },
    { id: 'contacted', title: 'Contacted', color: 'bg-yellow-500' },
    { id: 'proposal', title: 'Proposal', color: 'bg-purple-500' },
    { id: 'won', title: 'Won', color: 'bg-green-500' },
    { id: 'lost', title: 'Lost', color: 'bg-red-500' }
  ];

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) {
      // Same column - reorder within column
      return;
    }

    // Move lead to different stage
    moveLead(draggableId, destination.droppableId);
    toast.success('Lead moved successfully');
  };

  const handleCreateLead = () => {
    openModal('lead', null);
  };

  const handleEditLead = (lead) => {
    openModal('lead', lead);
  };

  const handleDeleteLead = (leadId, leadTitle) => {
    if (window.confirm(`Are you sure you want to delete "${leadTitle}"?`)) {
      deleteLead(leadId);
      toast.success('Lead deleted successfully');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getClientById = (clientId) => {
    return clients.find(client => client.id === clientId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leads Pipeline</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your sales pipeline with drag and drop
          </p>
        </div>
        <button
          onClick={handleCreateLead}
          className="mt-4 sm:mt-0 btn-primary flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </button>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="card p-4">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pipeline</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${getPipelineValue().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        {stages.map((stage) => (
          <div key={stage.id} className="card p-4">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stage.title}</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {getLeadCount(stage.id)}
                </p>
                <p className="text-xs text-gray-500">
                  ${getStageValue(stage.id).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {stages.map((stage) => {
            const stageLeads = getLeadsByStage(stage.id);
            
            return (
              <div key={stage.id} className="space-y-4">
                {/* Stage Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{stage.title}</h3>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-full">
                      {stageLeads.length}
                    </span>
                  </div>
                </div>

                {/* Stage Column */}
                <Droppable droppableId={stage.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-[500px] p-4 rounded-lg border-2 border-dashed transition-colors ${
                        snapshot.isDraggingOver
                          ? 'border-primary-300 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                      }`}
                    >
                      {stageLeads.map((lead, index) => (
                        <Draggable key={lead.id} draggableId={lead.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`mb-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 cursor-move transition-shadow ${
                                snapshot.isDragging ? 'shadow-lg' : 'hover:shadow-md'
                              }`}
                            >
                              {/* Lead Header */}
                              <div className="flex items-start justify-between mb-3">
                                <h4 className="font-medium text-gray-900 dark:text-white text-sm leading-tight">
                                  {lead.title}
                                </h4>
                                <div className="flex items-center space-x-1">
                                  <button
                                    onClick={() => handleEditLead(lead)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                                  >
                                    <Edit className="h-3 w-3" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteLead(lead.id, lead.title)}
                                    className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-1"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>

                              {/* Lead Content */}
                              <div className="space-y-2">
                                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                                  {lead.description}
                                </p>
                                
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                  <User className="h-3 w-3 mr-1" />
                                  {lead.clientName}
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                    <DollarSign className="h-3 w-3 mr-1" />
                                    ${lead.value.toLocaleString()}
                                  </div>
                                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(lead.priority)}`}>
                                    {lead.priority}
                                  </span>
                                </div>

                                {lead.expectedCloseDate && (
                                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {format(new Date(lead.expectedCloseDate), 'MMM dd')}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      
                      {/* Empty State */}
                      {stageLeads.length === 0 && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No leads</p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>

      {/* Lead Form Modal */}
      {activeModal === 'lead' && (
        <LeadForm
          lead={modalData}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Leads; 