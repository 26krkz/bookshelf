"use client";
import Button from "../Button";
import Input from "../Input";
import styles from "./styles.module.css";

export default function Search({ formAction }: { formAction: (payload: FormData) => void }) {
  return (
    <form action={formAction} className={styles.searchContainer}>
      <Input placeholder="タイトルで検索" className={styles.input} name="inputValue"></Input>
      <Button type="submit" className={styles.searchButton}>
        検索
      </Button>
    </form>
  );
}
