import { prisma } from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

// GET method - fetch review by id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const review = await prisma.review.findMany({
    where: { id: Number(id) },
  });
  return NextResponse.json(review[0]);
}
