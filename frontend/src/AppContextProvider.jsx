import {createContext, useContext} from "react";

export const AppContextProvider = createContext(undefined);

export function useAppContext() {
    const context = useContext(AppContextProvider);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
}