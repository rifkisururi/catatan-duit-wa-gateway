import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NyatetDuit - Catat Keuangan dengan WhatsApp | Simpan di Google Sheet",
  description: "Catat keuangan dengan mudah melalui WhatsApp dan simpan otomatis di Google Sheet. Gratis untuk pemula, upgrade untuk fitur lebih lengkap. Mulai sekarang!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
