import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import MovieSearchResults from "./MovieSearchResults";
import Modal from "../Modals/modal";
import NavBarItem from "./NavBarItem";
import "./SearchMovies.css"

function SearchMovies(props) {
  const navigate = useNavigate();
  const [movieResults, setMovieResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isloadingSearchResults, setIsLoadingSearchResults] = useState(false);
  const [searchBarisShowing, setSearchBarIsShowing] = useState(false);
  const [searchError, setSearchError] = useState("")
  const dropdownRef = useRef(null)

  function onClickAway(event){

   if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
    setSearchBarIsShowing(false);
    props.onActiveSearch(false)
    setMovieResults([])
    setInput("")
   } 
  }

  document.addEventListener("mousedown",onClickAway)


  function onClickAddHandler(event) {
    console.log(event.currentTarget.textContent);
    if (event.currentTarget.textContent === "Add Review") {
      setSearchBarIsShowing(true);
      props.onActiveSearch(true);
    }
  }

  async function handleChange(event) {
    setInput(event.target.value);
    setIsLoadingSearchResults(true);
    const searchInput = { title: input };

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/movies/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchInput),
      });
      const responseData = await response.json();
      if(responseData.Response === "False"){throw Error({message:"No movies were found"})}
      setSearchError("")
      setMovieResults(responseData.Search);
      setIsLoadingSearchResults(false);
    } catch (error) {
      setSearchError(error.message)
    }
  }

  async function selectMovie(movie) {
    props.onSelectMovie()
    setIsLoading(true);
    setSearchBarIsShowing(false);
    setInput("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/movies/movies/${movie.imdbID}`,
      );
      const responseData = await response.json();
      setIsLoading(false);
      setMovieResults([]);
      navigate(`/NewMovie/${movie.imdbID}`);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }


  return (
    <div className="search-movies" >
      {searchBarisShowing ? (
        <div className="searchbarWithResults" ref={dropdownRef}>
          <NavBarItem>
            <SearchBar
              isVisible={searchBarisShowing}
              onChange={handleChange}
              value={input}
            />
          </NavBarItem>
          <MovieSearchResults
            array={movieResults}
            onSelectMovie={selectMovie}
            loadingSearch={isloadingSearchResults}
            noResults={searchError}
          />
        </div>
      ) : (
        <NavBarItem>
          <button className="button add-review-button" onClick={onClickAddHandler}>Add Review</button>
        </NavBarItem>
      )}
      {isLoading ? <Modal title="Loading" /> : null}
    </div>
  );
}

export default SearchMovies;
