"use client";
import { BookCard } from "@/types";
import styles from "./styles.module.css";
import Image from "next/image";
import { Dialog } from "@radix-ui/themes";
import FavoriteButtonContainer from "../FavoriteButtonContainer";
import AddBookshelfButtonContainer from "../AddBookshelfButtonContainer";
import Button from "../Button";

export const BookViewModal = ({ card, favoriteStatus = false, addBookshelf = false }: { card: BookCard; favoriteStatus?: boolean; addBookshelf?: boolean }) => {
  const { title, authors, description, imageUrl, id } = card;
  return (
    <Dialog.Content>
      <div className={styles.container}>
        <div>
          <div className={styles.imageWrapper}>
            <Image src={imageUrl} alt="本の画像" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className={styles.image} />
          </div>
        </div>
        <div className={styles.modalTextArea}>
          <Dialog.Title>{title}</Dialog.Title>
          <p className={styles.author}>{authors?.[0]}</p>
          <Dialog.Description className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
          <div className={styles.buttonArea}>
            <AddBookshelfButtonContainer bookId={id} addBookshelf={addBookshelf} />
            <FavoriteButtonContainer bookId={id} favorite={favoriteStatus} />
          </div>
          <Dialog.Close>
            <Button type="button" className={styles.closeButton}>
              閉じる
            </Button>
          </Dialog.Close>
        </div>
      </div>
    </Dialog.Content>
  );
};
