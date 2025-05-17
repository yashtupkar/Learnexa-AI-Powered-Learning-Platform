import { createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backend_URL = import.meta.env.VITE_BACKEND_URL;
    const value = {
        backend_URL
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
