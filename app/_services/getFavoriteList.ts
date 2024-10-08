import { BookInfo, GoogleBook } from "@/types";
import prisma from "../../prisma";
import { getServerSession } from "@/lib/auth";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

const getBook = async (id: string): Promise<GoogleBook> => {
  return fetch(`${BASE_URL}/${id}`)
    .then(async (res: Response) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return data;
    })
    .catch((err: unknown) => {
      if (err instanceof Error) {
        console.warn(err.message);
      }
      throw err;
    });
};

export default async function getFavoriteList(): Promise<BookInfo[]> {
  const session = await getServerSession();
  if (!session) {
    return [];
  }
  try {
    const bookIds = await prisma.favorite
      .findMany({
        where: {
          userId: session?.user.id,
        },
        select: {
          bookId: true,
        },
      })
      .then((v) => v.map((obj) => obj.bookId));

    const books = await Promise.all(
      bookIds.map(async (id: string) => {
        return await getBook(id);
      })
    );
    if (books && books.length > 0) {
      const result = books.map((book: GoogleBook) => {
        return {
          id: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          imageUrl: book.volumeInfo.imageLinks?.thumbnail ?? `https://placehold.jp/150x210.png?text=${book.volumeInfo.title}`,
          description: book.volumeInfo.description,
        };
      });
      return result;
    } else {
      console.log("No books found in getFavoriteList.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching book data:", error);
    return [];
  }
}
