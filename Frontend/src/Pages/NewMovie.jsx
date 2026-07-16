import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NewMovieReview from "../Components/Movies/NewMovieReview";
import Modal from "../Modals/Modal";
import { AuthContext } from "../authentication/authContext";
import PageLayout from "../Components/Shared/PageLayout";
import SuccessModal from "../Modals/SuccessModal";
import LoadingModal from "../Modals/LoadingModal";

function NewMovie(props){
    const {id} = useParams()
    const [movieDetails, setMovieDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [modalMessage, setModalMessage] = useState("")
    const {user} = useContext(AuthContext) 
   const userToken = localStorage.getItem("token") 
    const navigate = useNavigate()

    useEffect(()=>{
        async function getMovieDetails(){
            setIsLoading(true)
          try{
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/movies/movies/${id}`,{headers:{"Content-Type":"pplication/json", "Authorization":`Bearer ${userToken}`}}) 
            const movie = await response.json();
             setMovieDetails(movie)
            setIsLoading(false)
        }catch(error){
          setModalMessage("Internal error")
          setTimeout(()=>setModalMessage(""),2000)
        }finally{
            setIsLoading(false)
        }
        }

        getMovieDetails()
        
    },[id])

     async function handleSubmit(review) {
    
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/movies/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization":`Bearer ${userToken}` },
        body: JSON.stringify(review),
      });
      const responseData = await response.json();
      if(!response.ok){throw new Error(responseData.message)}
      setModalMessage("Review created")
      setTimeout(()=>{
        setModalMessage("")
        navigate("/");
      },1000)
    } catch (error) {
      setModalMessage(error.message)
      setTimeout(()=>{
        setModalMessage("")
      },1000)
    }finally{
        setIsLoading(false);
    }
  }

return(
    <PageLayout >
        <SuccessModal failureMessage={modalMessage} />
        {isLoading && <LoadingModal />}
        {!isLoading && movieDetails && (
            <NewMovieReview onSubmit={handleSubmit}
                details={movieDetails}
                user={user}
            />
        )}
    </PageLayout>
);
    

}

export default NewMovie