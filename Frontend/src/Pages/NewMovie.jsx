import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NewMovieReview from "../Components/Movies/NewMovieReview";
import Modal from "../Modals/modal";
import { useAuth } from "../authentication/authContext";
import PageLayout from "../Components/Shared/PageLayout";
import SuccessModal from "../Modals/SuccessModal";

function NewMovie(props){
    const {id} = useParams()
    const [movieDetails, setMovieDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [modalMessage, setModalMessage] = useState("")
    const {user} = useAuth() 
    const navigate = useNavigate()

    useEffect(()=>{
        async function getMovieDetails(){
            setIsLoading(true)
          try{
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/movies/movies/${id}`) 
            const movie = await response.json();
             setMovieDetails(movie)
            setIsLoading(false)
        }catch(error){
            console.log(error)
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
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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
        {isLoading && <Modal title="loading" />}
        {!isLoading && movieDetails && (
            <NewMovieReview onSubmit={handleSubmit}
                details={movieDetails}
                user={user}
            />
        )}
        {!isLoading && !movieDetails && <p>Erro ao carregar os dados.</p>}
    </PageLayout>
);
    

}

export default NewMovie