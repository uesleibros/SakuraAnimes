import {Montserrat} from "next/font/google";
import {NextUIProvider} from "@nextui-org/react";
import "./globals.css";

const font = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Sakura Animes",
  description: "Está cansado de ter que entrar em sites com anúncios e de qualidade baixa? Então largue tudo e venha conhecer nossa plataforma n° 1 de streaming.",
  referrer: "origin-when-cross-origin",
  keywords: ["Sakura Animes", "Animes", "Assistir Animes", "Ver Animes", "Animes sem anúncios"],
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: [
    {
      rel: "icon",
      type: "image/png",
      url: "/logo.png"
    }
  ]
};

export const viewport = {
  themeColor: "pink"
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`dark ${font.className}`}>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
