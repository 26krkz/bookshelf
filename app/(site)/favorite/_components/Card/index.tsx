"use client";
import type { BookInfo } from "@/types";
import AlertDialog from "@/_components/AlertDialog";
import styles from "./styles.module.css";
import BookCard from "@/_components/BookCard";
import { BookViewModal } from "../BookViewModal";
import { ModalContainer } from "@/_components/ModalContainer";
import useModal from "@/_hooks/useModal";

export default function Card({ card }: { card: BookInfo }) {
  const { openModal, closeModal, isOpen } = useModal(false);

  return (
    <li className={styles.cardContainer}>
      <ModalContainer content={() => <BookViewModal card={card} />}>
        <BookCard card={card} cardSize="small" />
      </ModalContainer>
      <span className={styles.title}>{card.title}</span>
      <AlertDialog openModal={openModal} closeModal={closeModal} isOpen={isOpen} bookListType="お気に入りリスト" description={`【${card.title}】を削除してもよろしいですか？`} id={card.id} />
    </li>
  );
}
