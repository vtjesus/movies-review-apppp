"use client";
import { useState, useEffect } from "react";
import { Movie } from "./types";
import { deleteMovie, getMovies } from "../lib/api";
import Layout from "./components/Layout";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { useRouter } from "next/navigation";
import AddMovieModal from "./components/AddMovieModal";
import AddReviewModal from "./components/AddReviewModal";

export default function Home() {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false);
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const fetchedMovies = await getMovies();
      setMovies(fetchedMovies);
      setFilteredMovies(fetchedMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false); // Set loading to false after the movies have been fetched
    }
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = movies.filter((movie) =>
      movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleMovieClick = (movieId: number) => {
    router.push(`/movies/${movieId}`);
  };

  const handleDeleteMovie = async (movieId: number) => {
    try {
      await deleteMovie(movieId);
      alert("Movie deleted successfully.");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleUpdateMovie = (movie: Movie) => {
    if (movie) {
      setMovieToEdit(movie); // Set the movie to edit
      setIsAddMovieModalOpen(true); // Open the modal for editing
    }
  };

  const handleAddNewMovie = () => {
    setMovieToEdit(null); // Ensure no movie is selected (for adding a new movie)
    setIsAddMovieModalOpen(true); // Open the modal for adding a movie
  };

  return (
    <Layout
      onAddMovie={handleAddNewMovie}
      onAddReview={() => setIsAddReviewModalOpen(true)}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-4 text-gray-600">
          The best movie reviews site!
        </h1>
        <SearchBar onSearch={handleSearch} />
        <MovieList
          movies={filteredMovies}
          onMovieClick={handleMovieClick}
          onDeleteMovie={handleDeleteMovie}
          onUpdateMovie={handleUpdateMovie}
          loading={loading}
        />
      </div>
      {isAddMovieModalOpen && (
        <AddMovieModal
          onClose={() => setIsAddMovieModalOpen(false)}
          onMovieAdded={fetchMovies}
          movieToEdit={movieToEdit}
        />
      )}
      {isAddReviewModalOpen && (
        <AddReviewModal
          onClose={() => setIsAddReviewModalOpen(false)}
          onReviewAdded={fetchMovies}
          movies={movies}
        />
      )}
    </Layout>
  );
}
