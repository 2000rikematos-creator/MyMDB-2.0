import NavBarItems from "./NavBarItems";
import Logo from "./Logo.jsx";
import React, { useState } from "react";
import "./NavBar.css";
import SignupModal from "../Modals/SignupModal.jsx";
import LoginModal from "../Modals/LoginModal.jsx";
import SuccessModal from "../Modals/SuccessModal.jsx";
import { useAuth } from "../authentication/authContext.jsx";
import SearchMovies from "./SearchMovies.jsx";
import NavBarItem from "./NavBarItem.jsx";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SideDrawer from "./SideDrawer.jsx";
import MenuIcon from "../Components/Icons/MenuSVG.jsx";
import PageTitle from "./PageTitle.jsx";


function NavBar(props) {
  const [signupIsShowing, setSignupIsShowing] = useState(false);
  const [loginIsShowing, setLoginIsShowing] = useState(false);
  const [authTry, setAuthTry] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const { isLoggedIn, login, logout, user } = useAuth();
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false)
  const [screenIsSmall, setScreenIsSmall] = useState(false)
  const [searchIsActive, setSearchIsActive] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

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
      return "My Movies"
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
    console.log(isLoggedIn);
    console.log(userData);
    login(userData);
    console.log(user);

    setFailureMessage(null);
    if (auth === "login") {
      console.log(userData);
      setSuccessMessage(`Welcome back ${userData.username}`);
      setLoginIsShowing(false);
      setAuthTry(true);
      setTimeout(() => {
        setAuthTry(false);
      }, 1000);
    }
    if (auth === "signup") {
      console.log(user);
      setSuccessMessage(`Welcome ${userData.newUser.username}`);
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
    console.log(error);
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
      <Logo />
      <PageTitle where={locationHandler(location.pathname)} />
     
      {screenIsSmall ? 
      <>
      <MenuIcon onClick={handleMenuClick}/> 
       <SideDrawer onClose={onSideDrawerClose} isVisible={sideDrawerIsVisible}> {!isLoggedIn ? (
            <NavBarItems>
              <NavBarItem >
                <button className="button signup-button" onClick={onClickSignupHandler}> Signup </button>
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
                <button className="button my-movies-button" onClick={()=>{navigate("/MyMovies"); setSideDrawerIsVisible(false)}}>My Movies</button>
            </NavBarItem>
            <NavBarItem>
              <SearchMovies onActiveSearch={onSearchIsActive} onSelectMovie={()=>{setSideDrawerIsVisible(false)}} />
            </NavBarItem>
          </NavBarItems>
          )}
         </SideDrawer></>   : !isLoggedIn ? (
            <NavBarItems>
              <NavBarItem isVisible={false}>
                <button className="button signup-button" onClick={onClickSignupHandler}> Signup </button>
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
                <button  className="button my-movies-button" onClick={()=>{navigate("/MyMovies")}}>My Movies</button>
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
