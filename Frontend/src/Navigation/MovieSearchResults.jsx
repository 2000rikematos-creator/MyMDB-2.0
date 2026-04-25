import React from "react";
import MovieSearchItem from "./MovieSearchItem";
import "./MovieSearchResult.css";
import { useState, useRef } from "react";

function MovieSearchResults(props) {
  if (!props.array || props.array.length < 1 || props.array === undefined) {
    return null;
  }

  return (
    <ul className="movie-search-list">
      {props.loadingSearch ? (
        <li> Loading... </li>
      ) : ( props.noResults ? <MovieSearchItem noResults={props.noResults}/> :

        props.array.slice(0, 10).map((movie) => {
          return (
            <MovieSearchItem
              key={movie.imdbID}
              value={movie}
              poster={movie.Poster}
              name={movie.Title || movie.title}
              onClick={() => {
                props.onSelectMovie(movie);
              }}
            />
          );
        })
      )}
    </ul>
  );
}

export default MovieSearchResults;
