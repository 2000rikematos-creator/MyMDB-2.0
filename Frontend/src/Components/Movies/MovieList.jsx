import React, {useEffect, useState} from "react"
import MovieItem from "./MovieItem"
import "./MovieList.css"
import PageLayout from "../Shared/PageLayout"
import Modal from "../../Modals/modal"

function MovieList(props) {

   function background(image){
      const styling = {
         backgroundImage: `url(${image})`,
         backgroundSize: "cover",
      }
      return styling
   }

   if (!props.movies || props.movies.length === 0) return null

    
  return <PageLayout>
   <ul className="movie-list"> {props.movies.map((movie) => {
   
     return <div className="movie-list-item-container">
      <div key={movie.id} className="movie-list-background"> <img className="movie-list-background-image" src={movie.movieData.Poster}/>  </div>   
      <MovieItem
  onDelete={props.onDelete}
  onEdit={props.onEdit}
  isUpdatable={props.isUpdatable}
  key={movie._id}
  id={movie._id}

  movieData = {movie.movieData}
  starRating={movie.starRating}
  review={movie.review}
  username={movie.user.username}
/>
     </div>
     


   })} </ul> </PageLayout>
}

export default MovieList