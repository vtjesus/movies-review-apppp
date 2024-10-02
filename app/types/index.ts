export interface Movie {
  id: number;
  name: string;
  releaseDate: string;
  reviews: Review[];
  averageRating?: number;
}

export interface Review {
  id: number;
  movieId: number;
  reviewer: string;
  rating: number;
  comment: string;
}

export interface NewMovie {
  name: string;
  releaseDate: string;
}

export interface NewReview {
  movieId: number;
  reviewer: string;
  rating: number;
  comment: string;
}

export interface UpdateMovie {
  id: number;
  name?: string;
  releaseDate?: string;
}

export interface UpdateReview {
  id: number;
  reviewer?: string;
  rating?: number;
  comment?: string;
}
