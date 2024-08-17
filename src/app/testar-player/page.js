"use client";

import Script from "next/script";
import Header from "@/components/Header";

export default function TestarPlayer() {
  
  return (
    <main className="min-h-screen bg-zinc-950">
      <Script 
        src="/lib/playerjs.js"
        strategy="afterInteractive"
        onLoad={() => {
          var player = new Playerjs({ id:"player", file:"https://raw.githubusercontent.com/nicaksks/EnmaAi/main/assets/one-piece-movie-13/001.m3u8", title: "One Piece Gold: O Filme" });
        }}
      />
      <Header />
      <div className="mt-10">
        <div className="w-[600px] h-[600px] mx-auto" id="player"></div>
      </div>
    </main>
  );
}
