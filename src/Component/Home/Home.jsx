import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(""); // State for search query
  const [totalPages, setTotalPages] = useState(1); // State for total pages

  async function fetchMovies(pageNumber) {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=484c5bf6227a1f7fe3cb096c617269c0&page=${pageNumber}`
      );
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setTotalPages(response.data.total_pages); // Update total pages
      setPage(pageNumber + 1); // Increment page number
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }

  async function search(input, pageNumber = 1) {
    if (input.trim() === "") {
      setMovies([]);
      setPage(1); // Reset page number for trending movies
      fetchMovies(1); // Reset to trending movies if input is empty
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${input}&api_key=484c5bf6227a1f7fe3cb096c617269c0&page=${pageNumber}`
      );
      if (pageNumber === 1) {
        setMovies(response.data.results);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      }
      setTotalPages(response.data.total_pages); // Update total pages
      setPage(pageNumber + 1); // Increment page number
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const debouncedSearch = useCallback(debounce(search, 300), []);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (page <= totalPages) {
        if (query.trim() === "") {
          fetchMovies(page);
        } else {
          search(query, page);
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, query, totalPages]);

  useEffect(() => {
    fetchMovies(1); // Initial fetch for trending movies
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setPage(1); // Reset page number for trending movies
    } else {
      setPage(1); // Reset page number for search results
      debouncedSearch(query, 1); // Call the debounced search function
    }
  }, [query]);

  return (
    <div className="container mt-5 bg-light rounded-3 shadow-lg overflow-hidden">
      <div className="mb-4">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter your movie name .."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="row row-cols-1 row-cols-lg-5 row-cols-md-4 g-4">
        {movies.map((movie, ind) => (
          <div key={ind} className="col movieCard position-relative">
            <div className="rating-ribbon position-absolute bg-warning text-center">
              {movie.vote_average.toFixed(1)}
            </div>
            <div className="card h-100 shadow-sm">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                  alt={movie.title}
                  className="card-img-top"
                />
              </Link>
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
