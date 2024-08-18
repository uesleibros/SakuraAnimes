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
			<div className="mt-20 pb-20 px-[16px] mx-auto max-w-[1240px] w-full">
				<div id="player"></div>
			</div>
		</main>
	);
}