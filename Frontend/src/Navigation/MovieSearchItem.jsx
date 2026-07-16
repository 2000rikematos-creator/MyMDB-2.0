import "./MovieSearchItem.css"

function MovieSearchItem(props){
   if(props.noResults){return <li className="loading-search">No Results</li>}
   return <li value={props.value} onClick={props.onClick} className="movie-result-item"> <img className="mini-poster" src={props.poster} /> <h2 className="search-results-movie-title">{props.name}</h2>  </li>
}

export default MovieSearchItem