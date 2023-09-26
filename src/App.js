// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './MovieList';
import AddFavourite from './AddFavourite';
import RemoveFavourites from './RemoveFavourites';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';
import TicketBooking from './TicketBooking';

const API_URL = 'https://omdbapi.com?apikey=fe2f6c44';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies('prema');
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBookTickets = (movie) => {
    setSelectedMovie(movie);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingSuccess(null);
    setSelectedMovie(null);
  };

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'));
    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchMovies(searchTerm);
    }
  };

  return (
    <div className="app">
      <h1>Movie Center</h1>

      <div className="search">
        <input
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
        <img
          src="https://media.geeksforgeeks.org/wp-content/uploads/20230626112934/search.png"
          alt="search icon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {selectedMovie ? (
        <MovieDetails
          movie={selectedMovie}
          onBookTickets={() => handleBookTickets(selectedMovie)}
        />
      ) : (
        movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <div key={movie.imdbID} className="movie-card">
                <MovieCard
                  movie={movie}
                  onClick={() => handleMovieClick(movie)}
                />
                <button onClick={() => handleBookTickets(movie)} className="a">
                  Book Tickets
                </button>
                <button onClick={() => addFavouriteMovie(movie)} className="a">
                  Add to Favourites
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No Movies found</h2>
          </div>
        )
      )}

      {isBookingOpen && selectedMovie && (
        <TicketBooking
          movie={selectedMovie}
          onClose={handleCloseBooking}
          setBookingSuccess={setBookingSuccess}
        />
      )}

      {bookingSuccess && (
        <div className="booking-success">
          <p>{bookingSuccess}</p>
          <button onClick={handleCloseBooking} className="a">
            Book Another Ticket
          </button>
        </div>
      )}

      <div className='row d-flex align-items-center mt-4 mb-4'>
        <h1 className='b'>Favourite Movies</h1>
      </div>
      <div className='row'>
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
};

export default App;
