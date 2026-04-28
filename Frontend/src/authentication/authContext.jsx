import { createContext, useContext, useState, useEffect } from "react";
import Modal from "../Modals/Modal"

const AuthContext = createContext()

function AuthProvider(props){
const [user, setUser] = useState(null)
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
    async function checkSession() {
        try{
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/me`,{credentials:"include"})
        const responseData = await response.json();
        
        if(!response.ok) {return setUser(null) }

        setUser(responseData.user)
            console.log("session is", responseData)
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false)
        }
        
    }
    checkSession()
    
},[])

function login(userData){
    setUser(userData)
}

async function logout(){
    try{
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/logout`, {method:"POST", credentials:"include"})
    const responseData = await response.json()
    console.log(responseData)
    setUser(null)
    }catch(error){
        console.log(error)
    }
    
}

const isLoggedIn = user !== null



return <AuthContext.Provider value={{user, isLoggedIn, login, logout}}>
    {!isLoading ? props.children : <Modal title="Loading..." />}
</AuthContext.Provider>

}

function useAuth(){
    return useContext(AuthContext)
}

export {useAuth, AuthProvider}