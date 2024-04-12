import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ReactQueryContainer from "@/wrappers/ReactQueryContainer";
const Montse = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MailSage",
  description: "Best mailing option!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Montse.className}>
        <ReactQueryContainer>{children}</ReactQueryContainer>
      </body>
    </html>
  );
}
