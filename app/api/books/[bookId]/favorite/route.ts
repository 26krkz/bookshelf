import { NextRequest } from "next/server";
import prisma from "../../../../../prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getServerSession } from "@/lib/auth";

type PostRequestBody = {
  userId: string;
  prevState: boolean;
};

export async function POST(req: NextRequest, { params }: { params: { bookId: string; prevState: boolean } }) {
  try {
    const body: PostRequestBody = await req.json();
    if (body.prevState) {
      await prisma.favorite.delete({
        where: { userId_bookId: { bookId: params.bookId, userId: body.userId } },
      });
      revalidatePath("/favorite");
      return Response.json({ favorite: false });
    } else {
      await prisma.favorite.create({
        data: { bookId: params.bookId, userId: body.userId },
      });
      revalidatePath("/favorite");
      return Response.json({ favorite: true });
    }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return Response.json({ message: "Already favorite" }, { status: 409 });
      }
    }
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { bookId: string; prevState: boolean } }) {
  const session = await getServerSession();
  if (!session) throw new Error("Failed getting Session");
  try {
    await prisma.favorite.delete({
      where: { userId_bookId: { bookId: params.bookId, userId: session.user.id } },
    });
    revalidatePath("/favorite");
    return Response.json({ message: "Delete Suceeded" }, { status: 200 });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return Response.json({ message: "Already favorite" }, { status: 409 });
      }
    }
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
