import { prisma } from "../../../lib/prisma";
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

// DELETE method - delete review
export async function DELETE(req: Request) {
  const { id } = await req.json();

  // Find the review to get the associated movieId
  const reviewToDelete = await prisma.review.findUnique({
    where: { id: Number(id) },
  });

  if (reviewToDelete) {
    await prisma.review.delete({
      where: { id: Number(id) },
    });

    // Update the average rating after deleting the review
    await updateAverageRating(reviewToDelete.movieId);
  }

  return NextResponse.json(null, { status: 200 });
}

// PUT method - update review
export async function PUT(req: Request) {
  const { id, reviewer, rating, comment } = await req.json();

  // Find the review to get the associated movieId
  const reviewToUpdate = await prisma.review.findUnique({
    where: { id: Number(id) },
  });

  if (reviewToUpdate) {
    // Update the review using Prisma
    const updatedReview = await prisma.review.update({
      where: { id: Number(id) },
      data: {
        reviewer,
        rating: Number(rating),
        comment,
      },
    });

    // Update the average rating after updating the review
    await updateAverageRating(reviewToUpdate.movieId);

    return NextResponse.json(updatedReview, { status: 200 });
  }

  return NextResponse.json(null, { status: 404 });
}

// POST method - add new review
export async function POST(req: Request) {
  const { movieId, reviewer, rating, comment } = await req.json();

  // Create a new review
  const newReview = await prisma.review.create({
    data: {
      movieId: Number(movieId),
      reviewer,
      rating: Number(rating),
      comment,
    },
  });

  // Update the average rating after adding the new review
  await updateAverageRating(movieId);

  return NextResponse.json(newReview, { status: 201 });
}
