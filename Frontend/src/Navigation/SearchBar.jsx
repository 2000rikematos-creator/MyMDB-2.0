import React, {useState} from "react";
import PreventDefaultSubmit from "../Hooks/PreventDefaultsubmit";

import "./SearchBar.css"
import MovieSearchResults from "./MovieSearchResults";


function SearchBar(props){

    if(!props.isVisible) return null

    return <input className="search-bar" value={props.value} onChange={props.onChange} autoFocus placeholder="movies, shows, etc.." type="text"/>
}
export default SearchBar