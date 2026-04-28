import React, {useState, useEffect} from "react"
import MovieList from "../Components/Movies/MovieList.jsx"
import PageLayout from "../Components/Shared/PageLayout.jsx"
import {useAuth} from "../authentication/authContext.jsx" 
import Modal from "../Modals/Modal.jsx"
import ConfirmationModal from "../Modals/ConfirmationModal.jsx"
import LoadingModal from "../Modals/LoadingModal.jsx"
import { useNavigate, useParams } from "react-router-dom"
import SuccessModal from "../Modals/SuccessModal.jsx"

function MyMovies(){
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])
    const {user} = useAuth()
    const [deleteSure, setDeleteSure] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState("")
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [modalMessage, setModalMessage] = useState("")

    useEffect(()=>{

        if(!user) return

        console.log("user is", user)
         async function getMovies(){
           try{
             const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/movies/mymovies`, {credentials:"include"})
             const responseData = await response.json()
             if(!response.ok){throw new Error(responseData.message)}
             setMovies(responseData.reverse())
          }catch(error){
             console.log(error)
          }
         }
    
         getMovies()
       },[user])


       function handleDelete(id){
        setSelectedMovie(id)
        setDeleteSure(true)
       }

      async function handleConfirmDelete(){
        setIsLoadingDelete(true)
        setDeleteSure(false)
        try{
          
         
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/movies/movies/${selectedMovie}`, {method:"DELETE", credentials:"include"})
          const responseData = await response.json()
          console.log("response is",responseData)
          if (!response.ok) {
            throw new Error(responseData.message)
          }
          setModalMessage(responseData.message)
          setTimeout(() => {
            setModalMessage("")
            setMovies((prev)=>{
           return prev.filter((m)=>{return m._id !== responseData.review})
          })
          }, 1000);
          
        }catch(error){
          console.log(error)
        }finally{
          setIsLoadingDelete(false)
          setSelectedMovie("")
        }
          
       }

       function handleCancelDelete(){
        setDeleteSure(false)
        setSelectedMovie("")
       }

       function handleEdit(id){
          navigate(`/EditMovie/${id}`)
       }
    
       if(!movies) return null

return  <PageLayout>
<SuccessModal successMessage={modalMessage} />
    <MovieList movies={movies} isUpdatable={true} onDelete={handleDelete} onEdit={handleEdit} />
   {deleteSure ? <ConfirmationModal question="Are you sure you want to delete?" onConfirm={handleConfirmDelete} onCancel={handleCancelDelete}/>: null}
   {isLoadingDelete ? <LoadingModal text="Deleting..." /> : null}
    </PageLayout>
}

export default MyMovies