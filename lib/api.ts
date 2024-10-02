import { Movie, NewMovie, Review, NewReview } from "../app/types";

const API_URL = "/api";

export const getMovies = async (): Promise<Movie[]> => {
  const response = await fetch(`${API_URL}/movies`);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return response.json();
};

export const getMovie = async (id: number): Promise<Movie> => {
  const response = await fetch(`${API_URL}/movies/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }
  return response.json();
};

export const addMovie = async (movie: NewMovie): Promise<Movie> => {
  const response = await fetch(`${API_URL}/movies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  if (!response.ok) {
    throw new Error("Failed to add movie");
  }
  return response.json();
};

export const updateMovie = async (
  id: number,
  movie: Partial<Movie>
): Promise<Movie> => {
  const response = await fetch(`${API_URL}/movies`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...movie }),
  });
  if (!response.ok) {
    throw new Error("Failed to update movie");
  }
  return response.json();
};

export const deleteMovie = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/movies`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error("Failed to delete movie");
  }
};

export const getReviews = async (movieId: number): Promise<Review[]> => {
  const response = await fetch(`${API_URL}/reviews/${movieId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return response.json();
};

export const getReview = async (
  movieId: number,
  id: number
): Promise<Review> => {
  const response = await fetch(`${API_URL}/reviews/${movieId}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch review");
  }
  return response.json();
};

export const addReview = async (review: NewReview): Promise<Review> => {
  const response = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (!response.ok) {
    throw new Error("Failed to add review");
  }
  return response.json();
};

export const updateReview = async (
  id: number,
  review: Partial<Review>
): Promise<Review> => {
  const response = await fetch(`${API_URL}/reviews`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...review }),
  });
  if (!response.ok) {
    throw new Error("Failed to update review");
  }
  return response.json();
};

export const deleteReview = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/reviews`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error("Failed to delete review");
  }
};
