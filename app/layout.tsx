import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cat and Mouse Play - Fun Game for Cats",
  description: "Engage your cat with Cat and Mouse Play, an interactive game designed to entertain and stimulate your feline friend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="cat game, interactive cat game, cat entertainment, cat and mouse game" />
        <meta name="author" content="Your Name" />
        <meta property="og:title" content="Cat and Mouse Play - Fun Game for Cats" />
        <meta property="og:description" content="Engage your cat with Cat and Mouse Play, an interactive game designed to entertain and stimulate your feline friend." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cat-mouse-play.vercel.app/" />
        <meta property="og:image" content="https://cat-mouse-play.vercel.app/ogimage.png" />
        <title>Cat and Mouse Play - Fun Game for Cats</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}