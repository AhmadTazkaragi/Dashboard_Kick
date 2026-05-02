import type { Metadata } from "next";
import { Rubik ,Open_Sans} from "next/font/google";
import "./globals.css";



  const rubik = Rubik({
    variable: "--font-rubik",
    subsets: ["latin"],
  });
  const openSans = Open_Sans({
    variable: "--font-open-sans",
    subsets: ["latin"],
  });

export const metadata: Metadata = {
  title: "kick",
  description: "shoes store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${rubik.variable} ${openSans.variable}`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
