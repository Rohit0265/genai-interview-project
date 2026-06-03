import { createContext, useEffect, useState } from "react";
import { getMe } from "./services/auth.api";


export const AuthContext = createContext()



export const AuthProvider= ({children})=>{

    const [user,setuser] = useState(null)
    const [loading,setLoading] = useState(false)
    


    return (
        <AuthContext.Provider value={{user,setuser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}