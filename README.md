# CRM Application

A modern, responsive Customer Relationship Management (CRM) application built with React, Zustand, and TailwindCSS.

## ✨ Features

### 🔹 Client Management
- **Client Database**: Comprehensive client information storage
- **Search & Filter**: Advanced search and filtering capabilities
- **Client Profiles**: Detailed client profile pages with contact information
- **Tagging System**: Organize clients with custom tags
- **CRUD Operations**: Full Create, Read, Update, Delete functionality

### 🔹 Lead Tracking with Kanban Board
- **Sales Pipeline**: Visual Kanban board with drag-and-drop functionality
- **Lead Stages**: Track leads through New → Contacted → Proposal → Won/Lost
- **Pipeline Analytics**: Real-time pipeline value and conversion tracking
- **Lead Management**: Comprehensive lead creation and editing forms
- **Client Integration**: Seamlessly connect leads to existing clients

### 🔹 Task Management
- **Task Organization**: Create and manage tasks with priorities and due dates
- **Calendar View**: Switch between list and calendar views
- **Task Relationships**: Link tasks to specific clients and leads
- **Status Tracking**: Monitor task completion and overdue items
- **Assignment System**: Assign tasks to team members
- **Reminder System**: Visual indicators for overdue and upcoming tasks

### 🔹 UI/UX Excellence
- **Responsive Design**: Fully responsive for desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Toast Notifications**: Real-time feedback for user actions
- **Modal Forms**: Clean, accessible form interfaces
- **Professional Design**: Modern UI with consistent styling
- **Smooth Animations**: Polished transitions and interactions

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.2.0
- **State Management**: Zustand
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Drag & Drop**: react-beautiful-dnd
- **Notifications**: react-hot-toast
- **Date Handling**: date-fns
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
CRM/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.jsx       # Main layout with navigation
│   │   ├── ClientForm.jsx   # Client creation/editing form
│   │   ├── LeadForm.jsx     # Lead creation/editing form
│   │   └── TaskForm.jsx     # Task creation/editing form
│   ├── pages/               # Main application pages
│   │   ├── Dashboard.jsx    # Overview dashboard
│   │   ├── Clients.jsx      # Client management page
│   │   ├── ClientDetail.jsx # Individual client details
│   │   ├── Leads.jsx        # Kanban board for leads
│   │   └── Tasks.jsx        # Task management page
│   ├── stores/              # Zustand state management
│   │   ├── clientStore.js   # Client data and operations
│   │   ├── leadStore.js     # Lead data and pipeline logic
│   │   ├── taskStore.js     # Task data and filtering
│   │   └── uiStore.js       # UI state and theme
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles and TailwindCSS
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Project dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # TailwindCSS configuration
├── postcss.config.js        # PostCSS configuration
└── README.md                # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CRM
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📊 Data Models

### Client
```javascript
{
  id: string,
  name: string,
  email: string,
  phone: string,
  company: string,
  status: 'active' | 'inactive',
  tags: string[],
  notes: string,
  createdAt: ISO string,
  updatedAt: ISO string
}
```

### Lead
```javascript
{
  id: string,
  title: string,
  clientId: string,
  clientName: string,
  stage: 'new' | 'contacted' | 'proposal' | 'won' | 'lost',
  value: number,
  priority: 'low' | 'medium' | 'high' | 'urgent',
  description: string,
  contactPerson: string,
  email: string,
  phone: string,
  notes: string,
  expectedCloseDate: ISO string,
  createdAt: ISO string,
  updatedAt: ISO string
}
```

### Task
```javascript
{
  id: string,
  title: string,
  description: string,
  priority: 'low' | 'medium' | 'high' | 'urgent',
  status: 'todo' | 'in_progress' | 'completed' | 'cancelled',
  dueDate: ISO string,
  clientId: string,
  clientName: string,
  leadId: string,
  leadTitle: string,
  assignedTo: string,
  createdAt: ISO string,
  updatedAt: ISO string
}
```

## 🎨 Design System

The application uses a consistent design system with:
- **Color Palette**: Professional blue and gray tones with accent colors
- **Typography**: Clear hierarchy with readable fonts
- **Spacing**: Consistent spacing scale throughout
- **Components**: Reusable UI components with consistent styling
- **Icons**: Lucide React icon library
- **Responsive Breakpoints**: Mobile-first responsive design

## 🔒 Data Persistence

All data is persisted locally using:
- **Zustand Persist**: Automatic localStorage persistence
- **State Management**: Centralized state with Zustand stores
- **Data Integrity**: Consistent data structure across all modules

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile (320px+)**: Optimized mobile experience
- **Tablet (768px+)**: Adapted layouts for tablets
- **Desktop (1024px+)**: Full-featured desktop interface
- **Large Screens (1440px+)**: Enhanced layouts for large displays

## 🎯 Key Features Implementation

### ✅ Technical Requirements
- **Component Architecture**: Well-structured, reusable components
- **State Management**: Zustand for efficient state handling
- **Routing**: Nested routes for client details and navigation
- **Data Tables**: Advanced tables with search, sort, and filter
- **Responsive Design**: Mobile-friendly interface
- **UI Elements**: Modal forms, dropdowns, toast notifications

### ✅ Functional Requirements
- **Client Management**: Complete CRUD operations
- **Lead Pipeline**: Kanban board with drag-and-drop
- **Task System**: Calendar and list views with filtering
- **Search & Filter**: Comprehensive filtering across all modules
- **Data Persistence**: LocalStorage for data retention

### ✅ Bonus Features Implemented
- **Dark/Light Theme**: Toggle with persistent preference
- **Drag & Drop**: react-beautiful-dnd for Kanban board
- **Toast Notifications**: react-hot-toast integration
- **Smooth Animations**: Polished transitions throughout

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- **ESLint**: Code linting and formatting
- **Component Structure**: Modular, reusable components
- **State Management**: Centralized state with Zustand
- **Error Handling**: Comprehensive error handling and user feedback

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3
   - Any static hosting provider

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please open an issue in the repository or contact the development team. 