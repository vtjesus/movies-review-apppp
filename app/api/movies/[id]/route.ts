import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

// GET method - fetch movie by id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const movie = await prisma.movie.findMany({
    where: { id: Number(id) },
  });
  return NextResponse.json(movie[0]);
}
