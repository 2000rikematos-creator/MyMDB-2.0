import React, { useState, useRef } from "react";
import "./NewMovieReview.css";
import ConfirmationModal from "../../Modals/ConfirmationModal"


function NewMovieReview(props) {
  console.log("details is", props.ratingValue)
  const movie = props.details;
  const [zeroStarsConfirmation, setZeroStarsConfirmation] = useState(false)
  const [starValue, setStarValue] = useState(0);
  const [review, setReview] = useState({
    user: props.user.id,
    review: props.review || "",
    movieId: movie.imdbID,
    movieData: movie,
  });
  const textArea = useRef(null)

  function handleStarChange(event) {
    setStarValue(event.target.value);
  }

  function handleChange(event) {
    const textElement = textArea.current

    textElement.style.height = "auto";

   textElement.style.height = `${textElement.scrollHeight}px`
   

    setReview((prevValues) => {
      return {
        ...prevValues,
        review: event.target.value,
        starRating: starValue,
      };
    });
  }

  function handleSubmit(event){
    event.preventDefault();
    if(starValue === 0) {return setZeroStarsConfirmation(true)}
    props.onSubmit({...review, starRating: starValue})
  }

  function handleConfirmSubmit(){
    props.onSubmit({...review, starRating: starValue})
  }



  function handleStartTypingReview(event){
    textArea.current.scrollIntoView({behavior:"smooth"})
  }


  function handleCancelSubmit(){
    setZeroStarsConfirmation(false)
  }

  return (
    
    <div className="movie-review-container">
     {zeroStarsConfirmation ? <ConfirmationModal cancelClassName="cancel-submit-button" confirmClassName="confirm-submit-button" question="Do you want to give 0 stars?" onConfirm={handleConfirmSubmit} onCancel={handleCancelSubmit}/> : null} 
      <div className="movie-poster">
        {" "}
        <img className="poster-img" src={movie.Poster} />{" "}
      </div>
      <div className="movie-details">
        <div className="movie-meta">
          <h1> {movie.Title} </h1>
          <h2> {movie.Year} </h2>
          <h2> IMDb: {movie.imdbRating} </h2>
          <h3> {movie.Plot} </h3>
        </div>
        <div className="movie-review-form">
          <form className="star-rating">
            <div className="stars">
              {[...Array(10)].map((_, i) => {
                const ratingValue = 10 - i;
                return (
                  <React.Fragment key={ratingValue}>
                    <input
                      type="radio"
                      name="rating"
                      id={`star-${ratingValue}`}
                      value={ratingValue}
                      onChange={handleStarChange} // Onde guardas o valor no teu estado
                    />
                    <label htmlFor={`star-${ratingValue}`}>★</label>
                  </React.Fragment>
                );
              })}
            </div>
          </form>
          <form onSubmit={handleSubmit} className="review-form">
            <input type="hidden" name="starRating" value={starValue}/>
            <textarea rows="1" maxLength={500} ref={textArea} className="review-input-textbox" onChange={handleChange} onFocus={handleStartTypingReview} name="review" value={review.review}/>
            <input className="submit-review-button" type="submit" value="Submit Review"/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewMovieReview;