import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router
} from "react-router-dom";
import RoutersLayout from './Routers/Routers';
import './index.css';
import AuthProvider from './providers/AuthProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <RoutersLayout />
      </Router>
    </AuthProvider>
  </StrictMode>,
)
