"use client";

import Script from "next/script";
import Head from "next/head";
export default function TestarPlayer() {
  
  return (
    <main className="min-h-screen">
      <Head>
        <Script 
          src="/lib/playerjs.js"
          strategy="beforeInteractive"
          onLoad={() => {
            var player = new Playerjs({ id:"player", file:"https://raw.githubusercontent.com/nicaksks/EnmaAi/main/assets/one-piece-movie-13/001.m3u8", title: "One Piece Gold: O Filme" });
          }}
        />
      </Head>
      <header className="px-10 py-5 border-b shadow-sm">
        <h2 className="font-bold text-2xl text-pink-400">Sakura Animes — Testar Player</h2>
      </header>
      <div>
        <div id="player"></div>
      </div>
    </main>
  );
}
