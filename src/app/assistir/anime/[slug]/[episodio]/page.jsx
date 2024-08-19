"use client";

import {useEffect, useState} from "react";
import {Spinner} from "@nextui-org/react";
import Script from "next/script";

export default function AssistirEpisodio({params}) {
	const [anime, setAnime] = useState(null);
	const [episodios, setEpisodios] = useState(null);
	const {slug, episodio} = params;

	useEffect(() => {
		async function pegarEpisodiosAnime(anime) {
			const res = await fetch(`/api/buscar/animes/anroll/episodios?id=${anime.id}`);
			const {data} = await res.json();

			if (data.length > 0)
				setEpisodios(data);
		}

		async function pegarDadosAnime() {
			const res = await fetch(`/api/buscar/animes/anroll?q=${slug}`);
			const {data} = await res.json();

			if (data.length > 0) {
				if (data[0].slug === slug) {
					setAnime(data[0]);
					document.title = `${data[0].title} - Episódio ${episodio}`;
					await pegarEpisodiosAnime(data[0]);
				}
			}
		}

		pegarDadosAnime();
	}, []);
	
	return (
		<main>
			{anime && (
				<Script 
				  src="/lib/playerjs.js"
				  strategy="afterInteractive"
				  onReady={() => {
				  	var player = new Playerjs({ 
				  		id:"player", 
				  		file:`/api/streaming/anroll/${slug}/${episodio}/media.m3u8`, 
				  		title: `${anime.title} | Episódio ${episodio}`
				  	});
				  }}
				/>
			)}
			<div className="mt-20 pb-20 px-[16px] mx-auto max-w-[1240px] w-full">
				{anime ? (
					<div>
						<div>
							<h2 className="font-bold text-2xl">{anime.title} - Episódio {episodio}</h2>
						</div>
						<div className="mt-10" id="player"></div>
					</div>
				) : (
					<div>
						<Spinner />
						<p className="text-xs w-[350px] mt-2">
							Caso demore para carregar o componente, provavelmente o conteúdo que você está tentando acessar não existe.
						</p>
					</div>
				)}
			</div>
		</main>
	);
}