import { createContext, useState } from "react";


export const UtilityContext = createContext();

export function UtilityProvider({ children }) {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [bodyToast, setBodyToast] = useState("");

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <UtilityContext.Provider value={{ show, setShow,setIsLoading, isLoading, bodyToast, setBodyToast, showToast, setShowToast, handleCloseToast }}>
      {children}
    </UtilityContext.Provider>
  );
}