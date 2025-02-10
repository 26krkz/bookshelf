"use client";
import Button from "../Button";
import { signIn } from "next-auth/react";
import styles from "./styles.module.css";
import { useEffect } from "react";
import useGetNativeAppHeader from "@/_hooks/useGetNativeAppHeader";

declare global {
  interface Window {
    requestGoogleLogin: () => void;
  }
}

export default function LoginButton() {
  const { isNative } = useGetNativeAppHeader();
  useEffect(() => {
    if (isNative) {
      window.addEventListener("message", (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.token) {
            console.log("Received token:", data.token);
            // 🔹 ここで ID トークンをバックエンドに送信
          }
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      });

      return () => {
        window.removeEventListener("message", () => {});
      };
    }
  }, [isNative]);

  const handleClick = () => {
    if (isNative) {
      if (window.requestGoogleLogin) {
        window.requestGoogleLogin(); // ✅ Expo 側の `promptAsync` を呼び出し
      }
    } else {
      signIn();
    }
  };

  return (
    <Button type="button" onClick={handleClick} className={styles.loginButton}>
      会員登録 / ログイン
    </Button>
  );
}
