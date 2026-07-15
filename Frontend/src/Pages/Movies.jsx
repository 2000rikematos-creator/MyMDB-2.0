import React, {useState, useEffect} from "react"

import MovieList from "../Components/Movies/MovieList"
import PageLayout from "../Components/Shared/PageLayout"
import Modal from "../Modals/Modal"
import LoadingModal from "../Modals/LoadingModal"



function Movies(){

    const [movies, setMovies] = useState([])
    const [serverError, setServerError] = useState("")
    const [isLoadingMovies, setIsLoadingMovies] = useState(true)
    const [isLoading,setIsLoading]= useState(false)
    
        useEffect(()=>{
          setIsLoading(true)
             async function getMovies(){
               try{
                 const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/movies`)
                 const responseData = await response.json()
                 setMovies(responseData.movies.reverse())
              }catch(error){
               setServerError("Internal server error, please try again later.")
              }finally{
                setIsLoadingMovies(false)
                setIsLoading(false)
              }
             }
        
             getMovies()
           },[])

if(serverError) return <Modal title={serverError}/>
return <PageLayout>
  {isLoading ? <LoadingModal />:null}
    <MovieList isLoadingList={isLoadingMovies} movies={movies} />
</PageLayout>
}

export default Movies