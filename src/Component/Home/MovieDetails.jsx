import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=484c5bf6227a1f7fe3cb096c617269c0`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found!</div>;
  }

  return (
    <div className="movie-details container position-relative">
      <div className="row my-5">
        <div className="col-md-8">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
            className="w-100"
          />
        </div>
        <div className="col-md-4">
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </div>
      </div>
      <div className="position-absolute top-0 end-0 ms-5">
        <Link to='/'><i className="fa fas fa-arrow-alt-circle-left fa-2x "></i></Link>
      </div>
    </div>
  );
};

export default MovieDetails;
