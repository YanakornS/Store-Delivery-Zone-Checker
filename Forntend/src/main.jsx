import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext.jsx';
import router from './Routers/Router.jsx';


// Use createRoot from react-dom/client
const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
