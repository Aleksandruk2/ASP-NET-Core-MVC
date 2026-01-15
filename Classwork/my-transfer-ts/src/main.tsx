import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import APP_ENV from "./env";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {AuthProvider} from "./context/AuthContext/AuthProvider.tsx";
import {Provider} from "react-redux";
import {setupStore} from "./store";
import {ThemeProvider} from "./admin/context/ThemeContext.tsx";
import {AppWrapper} from "./admin/components/common/PageMeta.tsx";

const store = setupStore();

createRoot(document.getElementById('root')!).render(
  <>
      <Provider store={store}>
          <ThemeProvider>
              <AppWrapper>
                  <GoogleOAuthProvider clientId={APP_ENV.GOOGLE_CLIENT_ID}>
                      <BrowserRouter>
                          <AuthProvider>
                              <App />
                          </AuthProvider>
                      </BrowserRouter>
                  </GoogleOAuthProvider>
              </AppWrapper>
          </ThemeProvider>
      </Provider>
  </>,
)
