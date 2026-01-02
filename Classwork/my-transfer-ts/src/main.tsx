import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import APP_ENV from "./env";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {AuthProvider} from "./context/AuthContext/AuthProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <>
      <GoogleOAuthProvider clientId={APP_ENV.GOOGLE_CLIENT_ID}>
          <BrowserRouter>
              <AuthProvider>
                  <App />
              </AuthProvider>
          </BrowserRouter>
      </GoogleOAuthProvider>
  </>,
)
