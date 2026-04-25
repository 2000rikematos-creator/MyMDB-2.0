import React, {useState, useEffect} from "react";
import PageLayout from "../Components/Shared/PageLayout";
import NewMovieReview from "../Components/Movies/NewMovieReview";
import { useAuth } from "../authentication/authContext";
import { useParams } from "react-router-dom";
import LoadingModal from "../Modals/LoadingModal";
import { useNavigate } from "react-router-dom";
import HttpError from "../../../Backend/utils/errorHelper";
import SuccessModal from "../Modals/SuccessModal";

function EditMovie() {
const navigate = useNavigate() 
const [movieDetails, setMovieDetails] = useState("")
const [review, setReview] = useState("")
const {user} = useAuth()
const {id} = useParams()
const [isLoading, setIsLoading] = useState(false)
const [modalMessage, setModalMessage] = useState("")

useEffect(()=>{
        async function getMovieDetails(){
            setIsLoading(true)
          try{
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/movies/review/${id}`)
            if(!response.ok) throw new Error("review not found") 
            const responseData = await response.json()
            setReview(responseData.review)
             setMovieDetails(responseData.review.movieData)
            setIsLoading(false)
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false)
            
        }
        }

        getMovieDetails()
        
    },[id])

   async function handleSubmit(review){
        setIsLoading(true)
        try{
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/movies/review/${id}`, {method:"PATCH", headers:{"Content-Type":"application/json"}, credentials:"include", body: JSON.stringify(review)})
            const responseData = await response.json()
            if(!response.ok){ throw new Error(responseData.message)}

            setModalMessage("review updated")
           setTimeout(() => {
                setModalMessage("")
                navigate("/MyMovies")
            }, 1000);
            
        }catch(error){
            setModalMessage(error.message)
            setReview(review)
            setTimeout(() => {
                setModalMessage("")
            }, 1000);
        }finally{
            setIsLoading(false)
        }
    }



  return (
    <PageLayout>
        <SuccessModal failureMessage={modalMessage} />
        {isLoading && <LoadingModal title="loading" />}
        {!isLoading && movieDetails && (
            <NewMovieReview 
                onSubmit={handleSubmit}
                details={movieDetails}
                user={user}
                review={review.review}
                ratingValue={review.starRating}
            />
        )}
        {!isLoading && !movieDetails && <p>Erro ao carregar os dados.</p>}
    </PageLayout>
  );
}

export default EditMovie;
