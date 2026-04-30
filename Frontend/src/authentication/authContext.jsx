import { createContext, useContext, useState, useEffect } from "react";
import Modal from "../Modals/Modal"

const AuthContext = createContext()

function AuthProvider(props){
const [user, setUser] = useState(null)


function login(userData){
    setUser(userData)
}

async function logout(){
    try{
    const destroyToken = localStorage.removeItem("token")
    setUser(null)
    }catch(error){
        console.log(error)
    }
    
}

const isLoggedIn = user !== null


return <AuthContext.Provider value={{user, isLoggedIn, login, logout}}>
    {props.children}
</AuthContext.Provider>

}

function useAuth(){
    return useContext(AuthContext)
}

export {useAuth, AuthProvider}