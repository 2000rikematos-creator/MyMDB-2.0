import React, {useState, useEffect} from "react"

import MovieList from "../Components/Movies/MovieList"
import PageLayout from "../Components/Shared/PageLayout"
import Modal from "../Modals/Modal"



function Movies(){

    const [movies, setMovies] = useState([])
    const [serverError, setServerError] = useState("")
    
        useEffect(()=>{

             async function getMovies(){
               try{
                 const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/movies`)
                 const responseData = await response.json()
                 setMovies(responseData.movies.reverse())
              }catch(error){
               setServerError("Internal server error, please try again later.")
              }
             }
        
             getMovies()
           },[])

if(serverError) return <Modal title={serverError}/>
return <PageLayout>
    <MovieList movies={movies} />
</PageLayout>
}

export default Movies