import React, { useState } from "react";
import { useEffect } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./movieCard";

// API KEY -> d616b5a9

const API_URL = 'http://www.omdbapi.com?apikey=d616b5a9';

const movie1 = {
    "Title": "Italian Spiderman",
    "Year": "2007",
    "imdbID": "tt2705436",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZWQxMjcwNjItZjI0ZC00ZTc4LWIwMzItM2Q0YTZhNzI3NzdlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg"
};

const App = () =>{

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState(``);

    // api call
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(()=>{
        searchMovies(`Spiderman`)
    },[]);

    return (
        <div className="app">
            <h1>Ama Movies</h1>
            <div className="search">
                <input
                    placeholder="Search for movie"
                    value={searchTerm}
                    onChange={(e)=>{setSearchTerm(e.target.value)}}
                />
                <img
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}/>
            </div>

            {
                // NOTE: dynamically looping on the movie api response
                movies?.length > 0 
                ? (
                    <div className="container">
                        {movies.map((movie)=> (<MovieCard movie={movie}/>))}
                    </div>
                ) :
                (
                    <div className="empty">
                        <h2>No Movies Found.</h2>
                    </div>
                )
            }

        </div>
    );
} 

export default App;