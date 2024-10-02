import React from "react";
import { Movie } from "../types";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: Movie[];
  onMovieClick: (movieId: number) => void;
  onDeleteMovie: (movieId: number) => Promise<void>;
  onUpdateMovie: (movie: Movie) => void;
  loading: boolean;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  onMovieClick,
  onDeleteMovie,
  onUpdateMovie,
  loading,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center text-3xl text-gray-700 h-[50vh]">
        Loading Movies...
      </div>
    );
  }

  if (!loading && movies.length === 0) {
    return (
      <div className="flex items-center justify-center text-3xl text-gray-700 h-[50vh]">
        No movies found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={onMovieClick}
          onDeleteMovie={onDeleteMovie}
          onUpdateMovie={onUpdateMovie}
        />
      ))}
    </div>
  );
};

export default MovieList;
