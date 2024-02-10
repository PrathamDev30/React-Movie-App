import { useState, useEffect } from "react";
import { isPersistedState } from "../helpers";
import API from "../API";
const initialstate = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const [state, setstate] = useState(initialstate);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMovies = async (page, searchTerm = "") => {
    try {
      seterror(false);
      setloading(true);

      const movies = await API.fetchMovies(searchTerm, page);

      setstate((prev) => ({
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
      }));
    } catch (error) {
      seterror(true);
    }
    setloading(false);
  };

  useEffect(() => {
    if (!searchTerm) {
      const sessionState = isPersistedState("homeState");

      if (sessionState) {
        console.log("Grabbing from sessionStorage");
        setstate(sessionState);
        return;
      }
    }

    console.log("Grabbing from API ");
    setstate(initialstate);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  //load more
  useEffect(() => {
    if (!isLoadingMore) return;

    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);

  useEffect(() => {
    if (!searchTerm) sessionStorage.setItem("homeState", JSON.stringify(state));
  }, [searchTerm, state]);

  return { state, loading, error, searchTerm, setsearchTerm, setIsLoadingMore };
};
