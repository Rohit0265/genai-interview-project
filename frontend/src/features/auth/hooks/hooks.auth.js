import { useContext } from "react";
import { AuthContext, AuthProvider } from "../auth.context";
import { login,register,logout,getMe
 } from "../services/auth.api";
import { useNavigate } from "react-router";




export const useAuth = ()=>{
    const context = useContext(AuthContext)
    const {user,setuser,loading,setLoading} = context
    const navigate = useNavigate()

    const handleLogin = async ({email,password})=>{
        try {
            setLoading(true)
            const data = await login({email,password})
            console.log(data)
            setuser(data.user);
            navigate("/")
        } catch (error) {
            console.log(error)
        }finally{   
            setLoading(false)
        }
    }


    const handleRegister = async ({username,email,password})=>{
        try {
            setLoading(true)
            const data = await register({username,email,password})
            setuser(data.user);
        } catch (error) {
            console.log(error)
        }finally{

            setLoading(false)
        }
    }

    const handleLogout = async ()=>{
        try {
            
            setLoading(true)
            const data = await logout()
            setuser(null);
        } catch (error) {
            console.log(error)
        }finally{

            setLoading(false)
        }
    }

    return {user,loading,handleLogin,handleLogout,handleRegister}

}