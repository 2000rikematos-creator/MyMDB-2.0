import NavBarItems from "./NavBarItems";
import Logo from "./Logo.jsx";
import React, { useContext, useState } from "react";
import "./NavBar.css";
import SignupModal from "../Modals/SignupModal.jsx";
import LoginModal from "../Modals/LoginModal.jsx";
import SuccessModal from "../Modals/SuccessModal.jsx";
import { AuthContext, AuthProvider} from "../authentication/authContext.jsx";
import SearchMovies from "./SearchMovies.jsx";
import NavBarItem from "./NavBarItem.jsx";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SideDrawer from "./SideDrawer.jsx";
import MenuIcon from "../Components/Icons/MenuSVG.jsx";
import PageTitle from "./PageTitle.jsx";
import Modal from "../Modals/Modal.jsx";


function NavBar(props) {
  const [signupIsShowing, setSignupIsShowing] = useState(false);
  const [loginIsShowing, setLoginIsShowing] = useState(false);
  const [authTry, setAuthTry] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const { isLoggedIn, login, logout, user } = useContext(AuthContext);
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false)
  const [screenIsSmall, setScreenIsSmall] = useState(false)
  const [searchIsActive, setSearchIsActive] = useState(false)
  const [errorMessage,setErrorMessage] = useState("") 
   const navigate = useNavigate()
    const location = useLocation()

  useEffect(()=>{
    const verifySession = setInterval(()=>{
      async function verifyToken(){
        const token = localStorage.getItem("token")
        if(token){
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/verify-token`,{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${token}`},body:JSON.stringify({token:token})}) 
        const responseData = await response.json()
          if(responseData.message === 'Session expired'){
            setErrorMessage(responseData.message)
          setTimeout(()=>setErrorMessage(""),2000)
          logout()
        }
        }
        
          
      }
    verifyToken()
     
    },2000)

  return ()=>clearInterval(verifySession)

  },[])

   

    useEffect(()=>{
      setSideDrawerIsVisible(false)
       function handleResize(){
    if(window.innerWidth < 786){
      setScreenIsSmall(true)
    }
    if(window.innerWidth > 786){
      setScreenIsSmall(false)
    }
  }
      setScreenIsSmall(window.innerWidth < 786)

      window.addEventListener("resize",handleResize)

      return ()=>{window.removeEventListener("resize",handleResize)}


    },[])


  function locationHandler(location){

    if(location.startsWith("/EditMovie")){return "Edit Review"}
    if(location.startsWith("/NewMovie")){return "New Review"} 
    switch (location) {

     

      case "/":
        return "Home"
        break;
      case "/MyMovies":
      return "My Reviews"
        break;
      default:
        return "/"
        break;
    }
  }

  function onClickSignupHandler() {
    setSignupIsShowing(true);
  }
  function onClickLoginHandler() {
    setLoginIsShowing(true);
  }

  function onSuccessHandler(auth, userData) {
    login(userData);

    setFailureMessage(null);
    if (auth === "login") {
      setSuccessMessage(`Welcome back ${userData.username}`);
      setLoginIsShowing(false);
      setAuthTry(true);
      setTimeout(() => {
        setAuthTry(false);
      }, 1000);
    }
    if (auth === "signup") {
      setSuccessMessage(`Welcome ${userData.username}`);
      setSignupIsShowing(false);
      setAuthTry(true);
      setTimeout(() => {
        setAuthTry(false);
      }, 1000);
    }
  }

  function onFailureHandler(auth, error) {
    logout();
    setSuccessMessage(false);
    if (auth === "login") {
      setFailureMessage(error.message);
      setLoginIsShowing(false);
      setAuthTry(true);
      setTimeout(() => {
        setLoginIsShowing(true);
        setAuthTry(false);
      }, 1000);
    }
    if (auth === "signup") {
      setFailureMessage(error);
      setSignupIsShowing(false);
      setAuthTry(true);
      setTimeout(() => {
        setSignupIsShowing(true);
        setAuthTry(false);
      }, 1000);
    }
  }

 

 

 function handleMenuClick(){
  setSideDrawerIsVisible(true)
 }

function onSideDrawerClose(){
  setSearchIsActive(false)
  setSideDrawerIsVisible(false)
  
}

function onSearchIsActive(status){
  setSearchIsActive(status)
}



  return (
    <nav className="nav-bar">
      {errorMessage ? <Modal title={errorMessage}/>:null}
      <Logo />
      <PageTitle where={locationHandler(location.pathname)} />
     
      {screenIsSmall ? 
      <>
      <MenuIcon onClick={handleMenuClick}/> 
       <SideDrawer closingSignIsVisible={!searchIsActive} onClose={onSideDrawerClose} isVisible={sideDrawerIsVisible}> {!isLoggedIn ? (
            <NavBarItems>
              <NavBarItem >
                <button className="button signup-button" onClick={onClickSignupHandler}> Sign up </button>
            </NavBarItem> 
             <NavBarItem> 
                <button className="button login-button" onClick={onClickLoginHandler}> Login </button>
            </NavBarItem> 
             </NavBarItems>
          ) : (
         <NavBarItems>
            <NavBarItem isHidden={searchIsActive}>
                <button className="button logout-button" onClick={() => {logout(); ; setSideDrawerIsVisible(false)}}>Logout</button>
                </NavBarItem>
            <NavBarItem isHidden={searchIsActive}>
                <button className="button my-movies-button" onClick={()=>{navigate("/MyMovies"); setSideDrawerIsVisible(false)}}>My Reviews</button>
            </NavBarItem>
            <NavBarItem>
              <SearchMovies onActiveSearch={onSearchIsActive} onSelectMovie={()=>{setSideDrawerIsVisible(false)}} />
            </NavBarItem>
          </NavBarItems>
          )}
         </SideDrawer></>   : !isLoggedIn ? (
            <NavBarItems>
              <NavBarItem isVisible={false}>
                <button className="button signup-button" onClick={onClickSignupHandler}> Sign up </button>
            </NavBarItem> 
             <NavBarItem isVisible={false}> 
                <button className="button login-button" onClick={onClickLoginHandler}> Login </button>
            </NavBarItem> 
             </NavBarItems>
          ) : (
            <>
            <NavBarItems>
              <NavBarItem>
                <button className="button logout-button" onClick={() => {logout()}}>Logout</button>
                </NavBarItem>
            <NavBarItem>
                <button  className="button my-movies-button" onClick={()=>{navigate("/MyMovies")}}>My Reviews</button>
            </NavBarItem>
            <NavBarItem>
              <SearchMovies onActiveSearch={onSearchIsActive} onSelectMovie={()=>{setSideDrawerIsVisible(false)}}/>
            </NavBarItem>
          </NavBarItems>
            </>
         
          )}
      
      

            <SignupModal
            onFailure={onFailureHandler}
            onSuccess={onSuccessHandler}
            isOpen={signupIsShowing}
            onClose={() => {
              setSignupIsShowing(false);
            }}
          />
          <LoginModal
            onFailure={onFailureHandler}
            onSuccess={onSuccessHandler}
            isOpen={loginIsShowing}
            onClose={() => {
              setLoginIsShowing(false);
            }}
          />
          {authTry ? (
            <SuccessModal
              successMessage={successMessage}
              failureMessage={failureMessage}
            />
          ) : null}

    </nav>
  );
}

export default NavBar;
