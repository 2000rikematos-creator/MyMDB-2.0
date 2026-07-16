import { createContext, useContext, useState, useEffect } from "react";
import Modal from "../Modals/Modal"

const AuthContext = createContext()

function AuthProvider(props){
const [user, setUser] = useState(()=>localStorage.getItem("token"))


function login(userData){
    setUser(userData)
}

async function logout(){
    const destroyToken = localStorage.removeItem("token")
    setUser(null)
    
}

const isLoggedIn = user !== null


return <AuthContext.Provider value={{user, isLoggedIn, login, logout}}>
    {props.children}
</AuthContext.Provider>

}



export {AuthContext, AuthProvider}