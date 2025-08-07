import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { AppThemeProvider } from './context/AppThemeContext.jsx'
import { ModalProvider } from './context/ModalContext.jsx'
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HelmetProvider>
      <AppContextProvider>
        <BrowserRouter>
          <ModalProvider>
            <AppThemeProvider>
              <GoogleOAuthProvider
                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
              >
                <App />
              </GoogleOAuthProvider>
            </AppThemeProvider>
          </ModalProvider>
        </BrowserRouter>
      </AppContextProvider>
    </HelmetProvider>
  </Provider>
);
