"use client";

import {useEffect, useState} from "react";
import {Spinner} from "@nextui-org/react";
import {DiscussionEmbed} from "disqus-react";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import Episode from "@/components/Episode";
import toTitleCase from "@/utils/toTitleCase";

export default function AssistirEpisodio({params}) {
	const [anime, setAnime] = useState(null);
	const {slug, episodio} = params;
	const [episodios, setEpisodios] = useState(null);

	const disqusShortname = "animesroll2";

	useEffect(() => {
		async function pegarDadosAnime() {
			const res = await fetch(`/api/buscar/animes/anroll?q=${slug}`);
			const {data} = await res.json();

			if (data.length > 0) {
				if (data[0].slug === slug) {
					setAnime(data[0]);
					await proximoEAnteriorEpisodio(data[0]);
				}
			}
		}

		async function proximoEAnteriorEpisodio(animeData) {
			const res = await fetch(`/api/buscar/animes/anroll/episodios/navegar?id=${episodio}`);
			const {data} = await res.json();

			if (Object.keys(data).length > 0) {
				setEpisodios(data);
				document.title = `${animeData.title} - Episódio ${data.n_episodio}`;
			}
		}

		pegarDadosAnime();
	}, [episodio, slug]);
	
	return (
		<main className="min-h-screen">
			{(anime && episodios) && (
				<Script 
				  src="/lib/playerjs.js"
				  strategy="afterInteractive"
				  onReady={() => {
				  	var player = new Playerjs({ 
				  		id:"player", file:`/api/streaming/anroll/${slug}/${episodios.n_episodio}/media.m3u8`
				  	});
				  }}
				/>
			)}

			<div>
				{(anime && episodios) ? (
					<div>
						<div className="!w-full !h-[510px]">
							<div className="!h-full !w-full" id="player"></div>
						</div>
						<div className="mx-auto max-w-[1240px] w-full mt-2 sm:-mt-3">
							<div className="flex max-[640px]:flex-col sm:justify-between gap-10 sm:gap-2 w-full p-[16px] sm:p-[60px]">
								<div>
									<Link href={`/assistir/anime/${anime.slug}`} className="font-semibold text-md transition-colors text-blue-500 hover:text-white hover:underline">{anime.title}</Link>
									<h1 className="text-xl font-bold mt-3">EPISÓDIO {episodios.n_episodio}</h1>
									<p className="text-sm w-full sm:w-[600px] text-zinc-400">{anime.synopsis}</p>
								</div>
								<div className="flex flex-col gap-10">
									{Object.keys(episodios.nextEp).length > 0 && (
										<div>
											<h2 className="font-semibold text-md">PRÓXIMO EPISÓDIO</h2>
											<Episode slug={episodios.nextEp.anime.slug_serie} episode_id={episodios.nextEp.generate_id} episode_number={episodios.nextEp.n_episodio} dub={anime.extra_data.dub} thumbnail={`https://static.anroll.net/images/animes/screens/${episodios.nextEp.anime.slug_serie}/${episodios.nextEp.n_episodio}.jpg`} />
										</div>
									)}
									{Object.keys(episodios.prevEp).length > 0 && (
										<div>
											<h2 className="font-semibold text-md">EPISÓDIO ANTERIOR</h2>
											<Episode slug={episodios.prevEp.anime.slug_serie} episode_id={episodios.prevEp.generate_id} episode_number={episodios.prevEp.n_episodio} dub={anime.extra_data.dub} thumbnail={`https://static.anroll.net/images/animes/screens/${episodios.prevEp.anime.slug_serie}/${episodios.prevEp.n_episodio}.jpg`} />
										</div>
									)}
								</div>
							</div>
							<div className="mt-5 p-[16px] overflow-hidden">
								<p className="font-semibold text-sm mb-2">Sessão de comentários da Anroll</p>
								<div className="bg-zinc-900 p-10 rounded-lg">
									<DiscussionEmbed
						        shortname={disqusShortname}
						        config={
						        	{
						        		url: `https://www.anroll.net/anime/${anime.slug}/episodio-${episodios.n_episodio}`,
						        		title: `Assistir ${anime.title} - Episódio ${episodios.n_episodio} Online em HD - Anroll`,
						        		identifier: `${episodios.id_series_episodios}`,
						        		language: "pt_BR",
						        		colorScheme: "dark"
						        	}
						        }
						      />
					      </div>
				      </div>
						</div>
					</div>
				) : (
					<div className="px-[16px] mx-auto max-w-[1240px] w-full mt-20">
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
