import React from "react";
import { Movie } from "../types";

interface MovieCardProps {
  movie: Movie;
  onMovieClick: (movieId: number) => void;
  onDeleteMovie: (movieId: number) => void;
  onUpdateMovie: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onMovieClick,
  onDeleteMovie,
  onUpdateMovie,
}) => {
  return (
    <div
      className="bg-purple-100 p-4 shadow cursor-pointer"
      onClick={() => onMovieClick(movie.id)}
    >
      <h2 className="text-xl font-semibold mb-2 text-gray-600">{movie.name}</h2>
      <p className="text-base text-gray-600 mb-2 italic">
        Released: {new Date(movie.releaseDate).toLocaleDateString()}
      </p>
      <p className="text-lg font-bold mb-2 text-gray-800">
        Rating:{" "}
        {movie.averageRating ? movie.averageRating.toFixed(2) + "/10" : "N/A"}
      </p>
      <div className="flex justify-end">
        <button
          className=" hover:bg-purple-300 hover:rounded mr-2 h-5 w-5"
          onClick={(e) => {
            e.stopPropagation();
            onUpdateMovie(movie);
          }}
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="grey"
              d="M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640V512z"
            />
            <path
              fill="grey"
              d="m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"
            />
          </svg>
        </button>
        <button
          className=" hover:bg-purple-300 hover:rounded mr-2 h-5 w-5"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteMovie(movie.id);
          }}
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="grey"
              d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
