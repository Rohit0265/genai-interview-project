import axios from "axios"


const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"


export async function register({username,email,password}){
    try {    
        const response = await axios.post(`${baseURL}/api/auth/register`,{
            username,email,password
        },{
            withCredentials:true
        })
        return response.data
    } 
    catch (error) {
        console.log(error)
    }
}

export async function login({email,password}){
    try {
        const response = await axios.post(`${baseURL}/api/auth/login`,{
            email , password
        },{
            withCredentials:true
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function logout(){
    try {
        const response = await axios.get(`${baseURL}/api/auth/logout`,{
            withCredentials:true
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export async function getMe(){
    try {
        const response = await axios.get(`${baseURL}/api/auth/me`,{
            withCredentials:true
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}