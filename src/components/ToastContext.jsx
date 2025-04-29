import { createContext, useContext, useRef } from "react";
import { Toast } from 'primereact/toast';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const toastRef = useRef(null);

  const showToast = (message, severity = 'success', life = 3000) => {
    toastRef.current?.show({ severity, summary: severity.toUpperCase(), detail: message, life });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
