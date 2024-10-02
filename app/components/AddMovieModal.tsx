import React, { useState, useEffect } from "react";
import { addMovie, updateMovie } from "../../lib/api";
import { Movie } from "../types";

interface AddMovieModalProps {
  onClose: () => void;
  onMovieAdded: () => void;
  movieToEdit?: Movie | null;
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({
  onClose,
  onMovieAdded,
  movieToEdit,
}) => {
  // State for movie name and release date
  const [name, setName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  useEffect(() => {
    if (movieToEdit) {
      // If editing, pre-fill the form with the movie's details
      setName(movieToEdit.name);
      setReleaseDate(
        new Date(movieToEdit.releaseDate).toISOString().substr(0, 10)
      );
    } else {
      // If adding a new movie, clear the form
      setName("");
      setReleaseDate("");
    }
  }, [movieToEdit]);

  // Check if we're in edit mode
  const isEditMode = !!movieToEdit;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditMode && movieToEdit) {
        // Update the existing movie
        await updateMovie(movieToEdit.id, { name, releaseDate });
        alert("Movie updated successfully!");
      } else {
        // Add a new movie
        await addMovie({ name, releaseDate });
        alert("Movie added successfully!");
      }

      onMovieAdded();
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
          {isEditMode ? "Edit movie" : "Add new movie"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="releaseDate"
              className="block text-sm font-medium text-gray-700"
            >
              Release date
            </label>
            <input
              type="date"
              id="releaseDate"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              required
            />
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
              {isEditMode ? "Update movie" : "Create movie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;
