import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

// Function to calculate the average rating for a given movieId
async function updateAverageRating(movieId: any) {
  const allReviews = await prisma.review.findMany({
    where: { movieId: Number(movieId) },
  });

  const totalRating = allReviews.reduce(
    (sum: any, review: { rating: any }) => sum + review.rating,
    0
  );

  const averageRating =
    allReviews.length > 0 ? totalRating / allReviews.length : 0; // Set to 0 if there are no reviews

  // Update the averageRating of the movie
  await prisma.movie.update({
    where: { id: Number(movieId) },
    data: { averageRating },
  });
}

// GET method - fetch all reviews
export async function GET(
  req: Request,
  { params }: { params: { movieId: string } }
) {
  const { movieId } = params;

  const reviews = await prisma.review.findMany({
    where: { movieId: Number(movieId) },
    orderBy: { rating: "desc" },
  });

  // Update the average rating after getting all the reviews
  await updateAverageRating(movieId);

  return NextResponse.json(reviews);
}
