import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Movies from "./Pages/Movies"
import NewMovie from "./Pages/NewMovie"
import NavBar from './Navigation/NavBar';
import MyMovies from './Pages/MyMovies';
import { useAuth } from './authentication/authContext';
import EditMovie from './Pages/EditMovie';

function App() {

const {isLoggedIn} = useAuth()
const [clickedAway, setClickedAway] = useState(false)

function onClickAway(){
  console.log("clicked")
 setClickedAway(true)
}

  return(
    <Router>
<NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Movies />} exact />
          <Route path="/NewMovie/:id" element={isLoggedIn ? <NewMovie /> : <Navigate to= "/"/>} exact />
          <Route path="/MyMovies" element={isLoggedIn ? <MyMovies /> : <Navigate to= "/"/>}/>
          <Route path="/EditMovie/:id" element={isLoggedIn ? <EditMovie /> : <Navigate to= "/"/>} />
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>


      </main>

    </Router>
  )
  
  
}

export default App
