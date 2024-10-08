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

type Params = { bookshelfId?: string };

export default async function getBookshelfList(params: Params = {}): Promise<BookInfo[]> {
  const bookshelfId = params?.bookshelfId;
  let userId;
  if (bookshelfId) {
    const user = await prisma.user.findFirst({
      where: { bookshelf_id: bookshelfId },
    });
    userId = user?.id;
  } else {
    const session = await getServerSession();
    userId = session?.user.id;
  }

  try {
    const bookIds = await prisma.bookshelf
      .findMany({
        where: {
          userId,
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
      console.log("No books found in getBookshelfList.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching book data:", error);
    return [];
  }
}
