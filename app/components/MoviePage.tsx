import { useState, useEffect } from "react";
import { Movie, Review } from "../types";
import { getMovie, getReviews, deleteReview, getMovies } from "../../lib/api";
import Layout from "../components/Layout";
import ReviewList from "../components/ReviewList";
import AddReviewModal from "../components/AddReviewModal";
import AddMovieModal from "./AddMovieModal";

const MoviePage = ({ movieId }: { movieId: number }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false);
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [reviewToEdit, setReviewToEdit] = useState<Review | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (movieId) {
        await fetchMovie();
        await fetchReviews();
        await fetchMovies();
        setLoading(false);
      }
    };
    fetchData();
  }, [movieId]);

  const fetchMovie = async () => {
    try {
      const fetchedMovie = await getMovie(movieId);
      setMovie(fetchedMovie);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const fetchedReviews = await getReviews(movieId);
      setReviews(fetchedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchMovies = async () => {
    try {
      const fetchedMovies = await getMovies();
      setMovies(fetchedMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await deleteReview(reviewId);
      alert("Review deleted successfully.");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleAddReview = () => {
    setReviewToEdit(null);
    setIsAddReviewModalOpen(true);
  };

  const handleUpdateReview = (review: Review) => {
    if (review) {
      setReviewToEdit(review); // Set the review to edit
      setIsAddReviewModalOpen(true); // Open the modal for editing
    }
  };

  const handleAddMovie = () => {
    setIsAddMovieModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center text-3xl text-gray-700 h-screen">
        Loading Movie...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center text-3xl text-gray-700 h-screen">
        Movie not found.
      </div>
    );
  }

  return (
    <Layout onAddMovie={handleAddMovie} onAddReview={handleAddReview}>
      {movie && (
        <div className="container mx-auto px-4">
          <div className=" flex justify-between mb-4">
            <h1 className="text-3xl font-bold  text-gray-600">
              {movie.name || "Undefined"}
            </h1>
            <p className="text-3xl font-bold text-purple-700">
              {movie.averageRating
                ? movie.averageRating.toFixed(2) + "/10"
                : "N/A"}
            </p>
          </div>

          <ReviewList
            reviews={reviews}
            onDeleteReview={handleDeleteReview}
            onUpdateReview={handleUpdateReview}
          />
        </div>
      )}
      {isAddReviewModalOpen && (
        <AddReviewModal
          onClose={() => setIsAddReviewModalOpen(false)}
          reviewToEdit={reviewToEdit}
          onReviewAdded={() => {
            fetchReviews();
            fetchMovie(); // Refetch movie to update average rating
            fetchMovies();
          }}
          movies={movies}
        />
      )}
      {isAddMovieModalOpen && (
        <AddMovieModal
          onClose={() => setIsAddMovieModalOpen(false)}
          onMovieAdded={() => {
            fetchReviews();
            fetchMovie();
            fetchMovies();
          }}
        />
      )}
    </Layout>
  );
};

export default MoviePage;
