"use client";

import {useEffect, useState} from "react";
import Script from "next/script";
import Header from "@/components/Header";

export default function AssistirEpisodio({params}) {
	const {slug, episodio} = params;
	
	return (
		<main className="min-h-screen bg-zinc-950">
			<Script 
			  src="/lib/playerjs.js"
			  strategy="afterInteractive"
			  onReady={() => {
			  	var player = new Playerjs({ id:"player", file:`/api/streaming/anroll/${slug}/${episodio}/media.m3u8`, title: `${slug} | Episódio ${episodio}` });
			  }}
			/>
			<Header />
			<div className="mt-10">
				<div className="w-[700px] h-[700px] mx-auto" id="player"></div>
			</div>
		</main>
	);
}