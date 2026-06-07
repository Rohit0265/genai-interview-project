// frontend/src/features/auth/auth.context.jsx
import { createContext, useEffect, useState } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loading, setLoading] = useState(true) // Start as true to wait for verification

    useEffect(() => {
        const verifySession = async () => {
            try {
                const data = await getMe();
                if (data && data.user) {
                    setuser(data.user);
                }
            } catch (error) {
                console.error("Session verification failed:", error);
            } finally {
                setLoading(false); // Done checking
            }
        };
        verifySession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setuser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
