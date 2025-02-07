"use server";
import Heading from "@/_components/Heading";
import getBookshelfList from "@/_services/getBookshelfList";
import CardList from "./_components/CardList";
import styles from "./styles.module.css";
import { getServerSession } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  if (!session || !session.user) {
    notFound();
  }
  const cardItems = await getBookshelfList();
  return (
    <>
      <Heading className={styles.heading} as="h2">
        本棚を編集
      </Heading>
      {!!cardItems.length ? <CardList cards={cardItems} /> : <div className={styles.noDataText}>まだ本棚に登録された本がありません。</div>}
    </>
  );
}
