import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client'
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext.jsx';
import router from './Routers/Router.jsx';
import SuspenseContent from './component/SuspenseContent.jsx';



// Use createRoot from react-dom/client
const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
   <Suspense fallback={<SuspenseContent />}>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
</Suspense>
  </StrictMode>,
);
