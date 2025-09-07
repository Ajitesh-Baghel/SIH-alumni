# Alumni Management System

A comprehensive React.js-based Alumni Management System built with Material-UI, featuring role-based authentication, event management, alumni directory, job postings, and more.

## 🚀 Features

### Core Functionality
- **Role-based Authentication** - Student, Alumni, and Admin roles
- **Alumni Directory** - Search and filter alumni by batch, department, location
- **Event Management** - Create, view, and RSVP to events with calendar integration
- **Job Board** - Post and apply for jobs and internships
- **Discussion Forums** - Engage in topic-based discussions
- **Gallery** - Share and view event photos and media
- **Notifications** - Real-time updates for events, jobs, and forum activity
- **Profile Management** - Editable profiles with photo upload
- **Admin Panel** - User, event, and content moderation

### Technical Features
- **Responsive Design** - Mobile-first approach with Material-UI
- **Modern React** - Hooks, Context API for state management
- **SCSS Styling** - Custom styles with CSS variables
- **Path Aliases** - Clean import statements with @ aliases
- **Code Quality** - ESLint and Prettier configuration
- **Component Library** - Reusable UI components

## 🛠️ Technology Stack

- **Frontend**: React.js 19.x with Vite
- **UI Framework**: Material-UI (MUI) v6
- **Routing**: React Router v6
- **State Management**: React Context API
- **Styling**: SCSS + Material-UI theming
- **Charts**: Recharts for data visualization
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Code Quality**: ESLint + Prettier

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## 🎯 Usage Guide

### Authentication
- **Default Login**: Use any email/password combination (currently uses mock authentication)
- **Roles**: The system supports three roles - Student, Alumni, and Admin
- **Navigation**: Role-based sidebar navigation with appropriate access controls

## 🎨 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components
│   ├── forms/           # Form components
│   └── layout/          # Layout components
├── pages/               # Page components
│   ├── auth/           # Authentication pages
│   └── ...             # Feature pages
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── services/           # API service functions
├── utils/              # Utility functions
├── styles/             # SCSS stylesheets
├── assets/             # Static assets
└── data/               # Mock data and constants
```

## 🧪 Development Status

### ✅ Completed Features
- Project setup and configuration
- Authentication system with role-based access
- Layout components (Header, Sidebar, Footer)
- Routing with protected routes
- Basic page structure for all major features
- Material-UI theming and responsive design
- Code quality tools (ESLint, Prettier)

### 🚧 In Progress
- Dashboard components with widgets
- Profile management functionality
- Alumni directory with search/filter
- Event management system
- Job board implementation
- Forum functionality
- Gallery and media management
- Admin panel features
- Reusable component library

## 🔧 Configuration

### Path Aliases
The project uses Vite path aliases for clean imports:
- `@/` - src directory
- `@components/` - components directory
- `@pages/` - pages directory
- `@contexts/` - contexts directory
- `@utils/` - utils directory
- `@services/` - services directory
- `@assets/` - assets directory

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel or Netlify
1. Build the project locally or connect to Git
2. Configure build settings (build command: `npm run build`, output: `dist`)
3. Deploy the `dist` folder

## 📝 License

This project is open source and available under the MIT License.
