import type { Metadata } from "next";
import "./globals.css";
import "./reset.css";

export const metadata: Metadata = {
  title: "Bookshelf",
  description: "Bookshelf App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
