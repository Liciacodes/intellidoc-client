// src/config/api.ts
// Central configuration for API endpoints

const getApiUrl = (): string => {
  // Check if we're in production or development
  if (import.meta.env.PROD) {
    // Production: Use your Render backend URL
    return import.meta.env.VITE_API_URL || 'https://intellidoc-api.onrender.com';
  }
  
  // Development: Use localhost
  return 'http://localhost:5000';
};

export const API_URL = getApiUrl();

// Helper function to create API endpoint URLs
export const createApiEndpoint = (path: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_URL}/api/${cleanPath}`;
};

// Example usage:
// const loginUrl = createApiEndpoint('auth/login');
// const documentsUrl = createApiEndpoint('documents');