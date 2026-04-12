import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./app/providers/AuthProvider";
import AppErrorBoundary from "./components/common/AppErrorBoundary";
import "./index.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AppErrorBoundary>
  </StrictMode>,
)
