import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { AuthProviderWithConfig } from "./auth/AuthProviderWithConfig";
import './index.css';


console.log('Auth0 domain:', import.meta.env.VITE_AUTH0_DOMAIN);
console.log('Auth0 client id:', import.meta.env.VITE_AUTH0_CLIENT_ID);
console.log('Auth0 audience:', import.meta.env.VITE_AUTH0_AUDIENCE);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProviderWithConfig>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProviderWithConfig>
  </React.StrictMode>
)