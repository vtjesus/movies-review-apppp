import React, { useState, useEffect } from "react";
import { Movie, Review } from "../types";
import { addReview, updateReview } from "../../lib/api";

interface AddReviewModalProps {
  onClose: () => void;
  onReviewAdded: () => void;
  movies: Movie[];
  reviewToEdit?: Review | null;
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({
  onClose,
  onReviewAdded,
  movies,
  reviewToEdit,
}) => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (reviewToEdit) {
      setSelectedMovie(reviewToEdit.movieId.toString());
      setReviewer(reviewToEdit.reviewer);
      setRating(reviewToEdit.rating.toString());
      setComment(reviewToEdit.comment);
    } else {
      // Reset fields when adding a new review
      setSelectedMovie("");
      setReviewer("");
      setRating("");
      setComment("");
    }
  }, [reviewToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const reviewData = {
      movieId: parseInt(selectedMovie),
      reviewer,
      rating: parseInt(rating),
      comment,
    };

    try {
      if (reviewToEdit) {
        // Update the existing review
        await updateReview(reviewToEdit.id, reviewData);
        alert("Review updated successfully!");
      } else {
        // Add a new review
        await addReview(reviewData);
        alert("Review added successfully!");
      }

      onReviewAdded();
      onClose();
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {reviewToEdit ? "Edit review" : "Add new review"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="movie"
              className="block text-sm font-medium text-gray-700"
            >
              Select a movie
            </label>
            <select
              id="movie"
              value={selectedMovie}
              onChange={(e) => setSelectedMovie(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              disabled={!!reviewToEdit} // Disable dropdown when editing
              required
            >
              <option value="">Select a movie</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="reviewer"
              className="block text-sm font-medium text-gray-700"
            >
              Your name
            </label>
            <input
              type="text"
              id="reviewer"
              value={reviewer}
              onChange={(e) => setReviewer(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700"
            >
              Rating out of 10
            </label>
            <input
              type="number"
              id="rating"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Review comments
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              rows={4}
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {reviewToEdit ? "Update review" : "Add review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
