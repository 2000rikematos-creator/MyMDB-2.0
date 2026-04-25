import React from "react";
import "./MovieItem.css";
import { useState } from "react";

function MovieItem(props) {
    const starRating = parseInt(props.starRating, 10)
    const safetyRating = isNaN(starRating) ? 0 : starRating
    const [isHovering, setIsHovering] = useState(false)
    
    function handleHoverIn(){
      setIsHovering(true)
    }

    function handleHoverOut(){
      setIsHovering(false)
    }

   function handleDeleteClick(event){
    props.onDelete(props.id)
   }

   function handleEditClick(){
    props.onEdit(props.id)
   }

  return (
    <li className="movie-item" key={props.id}>
      <div onMouseDown={handleHoverIn} onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut} className="poster"> <img  className="poster-image" src={props.movieData.Poster}/> {isHovering && props.isUpdatable ? <div className="movie-item-button-container"> <button className="delete-button" onClick={handleDeleteClick}>Delete</button> <button className="edit-button" onClick={handleEditClick}>Edit</button></div> : null}</div> 
      <h2 className="movie-title">{props.movieData.Title}</h2>
      <h3 className="movie-list-review"> 
        <ul className="movie-list-star-rating"> {[...Array(10)].map((_, i)=>{if(i <= safetyRating){return <li className="movie-list-star-rating-item" key={i}>★</li>} return <li className="movie-list-empty-star-rating-item" key={i}>★</li>})} </ul>
        <p className="movie-list-review-text"> {props.review} </p>
       {!props.isUpdatable ? <p className="movie-list-username"> {props.username} </p> : null} 
         </h3>
    </li>
  );
}

export default MovieItem;
