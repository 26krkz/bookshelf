"use client";
import { BookCards } from "@/types";
import Card from "../Card";
import { SessionProvider } from "next-auth/react";
import styles from "./styles.module.css";

export default function CardList({ cards }: { cards: BookCards }) {
  return (
    <SessionProvider>
      <ul className={styles.cardlist}>
        {cards.map((card) => {
          return <Card key={card.id} card={card} />;
        })}
      </ul>
    </SessionProvider>
  );
}
