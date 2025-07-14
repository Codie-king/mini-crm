import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Building, Calendar, Edit, Trash2, Tag, FileText } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import useClientStore from '../stores/clientStore';
import useLeadStore from '../stores/leadStore';
import useTaskStore from '../stores/taskStore';
import useUIStore from '../stores/uiStore';
import ClientForm from '../components/ClientForm';

const ClientDetail = () => {
  const { id } = useParams();
  const { getClientById, deleteClient } = useClientStore();
  const { getLeadsByClient } = useLeadStore();
  const { getTasksByClient } = useTaskStore();
  const { openModal, closeModal, activeModal, modalData } = useUIStore();

  const client = getClientById(id);
  const clientLeads = getLeadsByClient(id);
  const clientTasks = getTasksByClient(id);

  if (!client) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Client not found</h2>
        <Link to="/clients" className="text-primary-600 hover:text-primary-700 mt-2 inline-block">
          Back to Clients
        </Link>
      </div>
    );
  }

  const handleEditClient = () => {
    openModal('client', client);
  };

  const handleDeleteClient = () => {
    if (window.confirm(`Are you sure you want to delete ${client.name}? This action cannot be undone.`)) {
      deleteClient(client.id);
      toast.success('Client deleted successfully');
      // Redirect to clients page
      window.location.href = '/clients';
    }
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'contacted': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'proposal': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'won': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'lost': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/clients"
            className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{client.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{client.company}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleEditClient}
            className="btn-secondary flex items-center"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </button>
          <button
            onClick={handleDeleteClient}
            className="btn-danger flex items-center"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Information */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Client Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{client.email}</p>
                </div>
              </div>

              {client.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Phone</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{client.phone}</p>
                  </div>
                </div>
              )}

              {client.company && (
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Company</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{client.company}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Member Since</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {format(new Date(client.createdAt), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Status</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  client.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                }`}>
                  {client.status}
                </span>
              </div>

              {client.tags && client.tags.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {client.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {client.notes && (
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Notes</p>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{client.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Leads and Tasks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Leads */}
          <div className="card">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Leads</h3>
                <Link
                  to="/leads"
                  className="text-primary-600 hover:text-primary-700 text-sm"
                >
                  View all leads
                </Link>
              </div>
            </div>
            <div className="p-6">
              {clientLeads.length > 0 ? (
                <div className="space-y-4">
                  {clientLeads.map((lead) => (
                    <div key={lead.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{lead.title}</h4>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(lead.stage)}`}>
                          {lead.stage}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{lead.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Value: ${lead.value.toLocaleString()}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(lead.priority)}`}>
                          {lead.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No leads found for this client</p>
              )}
            </div>
          </div>

          {/* Tasks */}
          <div className="card">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tasks</h3>
                <Link
                  to="/tasks"
                  className="text-primary-600 hover:text-primary-700 text-sm"
                >
                  View all tasks
                </Link>
              </div>
            </div>
            <div className="p-6">
              {clientTasks.length > 0 ? (
                <div className="space-y-4">
                  {clientTasks.map((task) => (
                    <div key={task.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{task.title}</h4>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                          {task.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{task.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No tasks found for this client</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Client Form Modal */}
      {activeModal === 'client' && (
        <ClientForm
          client={modalData}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ClientDetail; 