"use client";
import MoviePage from "@/app/components/MoviePage";

export default function MovieDetail({ params }: { params: { id: string } }) {
  const { id } = params; 

  return (
    <div>
      <MoviePage movieId={Number(id)} />
    </div>
  );
}
