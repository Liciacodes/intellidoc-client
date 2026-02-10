# Intellidoc Frontend - AI Document Assistant

## Frontend Overview
A modern, responsive React application for Intellidoc's AI-powered document assistant. The frontend provides an intuitive interface for document management, AI interactions, and user authentication. 

## Features
###  User Interface
- Responsive Design: Mobile-first approach with desktop optimizations
- Dark/Light Mode: Built-in theme support
- Material Design Icons: Consistent iconography
- Real-time Feedback: Toast notifications and loading states
- Accessibility: Semantic HTML and ARIA labels

### Document Management
- Document Upload: Drag & drop or browse files
- Document List: Table and card views with filtering/sorting
- Document Preview: Modal preview and full viewer
- File Type Detection: Visual indicators for PDF, DOCX, TXT
- Download/Delete: Secure file operation

### AI Integration
- Document Summarization: Generate AI summaries
- Q&A System: Ask questions about document content
- Key Points Extraction: Get bullet-point summaries
- Real-time Processing: Live AI responses
- Copy to Clipboard: Easy content sharing

## User Management
- Login/Registration: JWT-based authentication
- Profile Management: View and update personal info
- Password Reset: Email-based recovery
- Secure Routing: Protected routes with auth guards

## Tech Stack
- React 18 with TypeScript
- React Router DOM for navigation
- Zustand for state management
- Tailwind CSS for styling
- Material Symbols for icons

## UI/UX
- React Hot Toast for notifications
- Custom Hooks for reusable logic
- Responsive Breakpoints: Mobile, tablet, desktop
- Component Library: Reusable UI components

## Integration
- REST API communication with backend
- JWT Authentication token management
- File Upload with progress tracking
- Real-time Updates for AI features

## Quick Start
Prerequisites
- Node.js 18+ and npm/yarn
- Backend server running (localhost:5000)
- Modern web browser

## Installation
## 1. Clone the Repository
```
git clone https://github.com/Liciacodes/intellidoc-client
cd intellidoc-client
npm install
```

## 2. Install Dependencies
```
npm install
```

## 3. Build for production
```
npm run build
npm preview  # Preview production build
```

## 3. Component Guide
### Main Components
#### Dashboard.tsx
- Main workspace with recent documents
- Upload section with drag & drop
- AI quick action buttons
- Responsive grid layout

#### MyDocument.tsx
- Document list with table/card views
- Filtering and sorting controls
- File operations (view, download, delete)
- Mobile-optimized interface

#### AISidebar.tsx
- AI tool selection panel
- Summary generation
- Q&A interface
- Key points extraction

#### Login.tsx
- User authentication form
- Social login options
- Forgot password flow
- Form validation


## API Integration
### Authentication
```
// Login example
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

### Document Upload
```
// File upload with FormData
const formData = new FormData();
formData.append("file", file);
formData.append("title", title);

await fetch('http://localhost:5000/api/documents/uploads', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});
```
## Deployment
### Vercel Deployment
```
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```


### Netlify Deployment
```
# Build and deploy
npm run build
netlify deploy --prod
```

## Development Commands
```
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run analyze      # Analyze bundle size
```

