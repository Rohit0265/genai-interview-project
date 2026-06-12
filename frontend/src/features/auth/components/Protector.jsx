import { useAuth } from "../hooks/hooks.auth"
import React from 'react'
import { Navigate } from "react-router"
import Loading from "../../../components/Loading"

const Protector = ({children}) => {
    const {loading,user} = useAuth()
    if(loading){
        return <Loading variant="full-screen" message="Verifying session..." />
    }

    if(!user){
        return <Navigate to={"/login" }/>
    }
  return children
}

export default Protector