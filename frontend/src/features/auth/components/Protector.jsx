import { useAuth } from "../hooks/hooks.auth"
import React from 'react'
import { Navigate } from "react-router"
const Protector = ({children}) => {
    const {loading,user} = useAuth()
    if(loading){
        return (
            <main>
                <h1>
                    Loading......
                </h1>
            </main>
        )
    }

    if(!user){
        return <Navigate to={"/login" }/>
    }
  return children
}

export default Protector