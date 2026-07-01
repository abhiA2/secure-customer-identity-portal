import React from "react";
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.css';


console.log('Auth0 domain:', import.meta.env.VITE_AUTH0_DOMAIN);
console.log('Auth0 client id:', import.meta.env.VITE_AUTH0_CLIENT_ID);
console.log('Auth0 audience:', import.meta.env.VITE_AUTH0_AUDIENCE);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: 'openid profile email read:profile read:admin read:audit'
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
)