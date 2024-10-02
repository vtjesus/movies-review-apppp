import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

// GET method - fetch all movies
export async function GET() {
  const movies = await prisma.movie.findMany({
    include: { reviews: true },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(movies);
}

// POST method - add new movie
export async function POST(req: Request) {
  const { name, releaseDate } = await req.json();
  const newMovie = await prisma.movie.create({
    data: { name, releaseDate: new Date(releaseDate) },
  });
  return NextResponse.json(newMovie, { status: 201 });
}

// DELETE method - delete movie
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.movie.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json(null, { status: 200 });
}

// PUT method - update movie
export async function PUT(req: Request) {
  const { id, name, releaseDate } = await req.json();

  // Update the movie using Prisma
  const updatedMovie = await prisma.movie.update({
    where: { id: Number(id) }, 
    data: {
      name,
      releaseDate: releaseDate ? new Date(releaseDate) : undefined,
    },
  });

  return NextResponse.json(updatedMovie, { status: 200 });
}
