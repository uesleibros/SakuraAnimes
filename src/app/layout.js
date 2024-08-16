import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sakura Animes",
  description: "Está cansado de ter que entrar em sites com anúncios e de qualidade baixa? Então largue tudo e venha conhecer nossa plataforma n° 1 de streaming.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
