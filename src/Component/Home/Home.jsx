import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  async function fetchMovies(pageNumber) {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=484c5bf6227a1f7fe3cb096c617269c0&page=${pageNumber}`
      );
      console.log(response);
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setPage(pageNumber + 1);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchMovies(page);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  useEffect(() => {
    fetchMovies(page);
  }, []);

  return (
    <div className="container mt-5 bg-light rounded-3 shadow-lg overflow-hidden">
      <div className="row row-cols-1 row-cols-lg-5 row-cols-md-4 g-4">
        {movies.map((movie, ind) => (
          <div key={ind} className="col movieCard position-relative">
            <div className="rating-div position-absolute text-center bg-warning">
              {movie.vote_average.toFixed(1)}
            </div>
            <div className="card h-100 shadow-sm">
              <img
                src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                alt={movie.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && (
        <div className="text-center mt-3">
          <span className="spinner-border" role="status" aria-hidden="true"></span>
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
}
