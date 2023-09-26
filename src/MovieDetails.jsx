// MovieDetails.jsx
import React from 'react';

const MovieDetails = ({ movie }) => {
  return (
    <div className="movie-details">
      <h2>{movie.Title}</h2>
      <p>Year: {movie.Year}</p>
      <p>Type: {movie.Type}</p>
      <p>Plot: {movie.Plot}</p>
      {/* Add more movie details here as needed */}
    </div>
  );
};

export default MovieDetails;
