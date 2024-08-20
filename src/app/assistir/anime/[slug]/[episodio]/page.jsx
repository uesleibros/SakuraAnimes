"use client";

import {useEffect, useState} from "react";
import {FaCirclePlay} from "react-icons/fa6";
import {Spinner} from "@nextui-org/react";
import {DiscussionEmbed} from "disqus-react";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import classificacaoIndicativaCor from "@/utils/classificacaoIndicativaCor";
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
				  		id:"player", 
				  		file:`/api/streaming/anroll/${slug}/${episodios.n_episodio}/media.m3u8`,
				  	});
				  }}
				/>
			)}

			<div>
				{(anime && episodios) ? (
					<div>
						<div className="w-full !h-[510px]">
							<div className="!h-full" id="player"></div>
						</div>
						<div className="mx-auto max-w-[1240px] w-full mt-2 sm:-mt-3">
							<div className="flex max-[640px]:flex-col sm:justify-between gap-10 sm:gap-2 w-full p-[16px] sm:p-[60px]">
								<div>
									<Link href={`/assistir/anime/${anime.slug}`} className="font-semibold text-md transition-colors text-pink-500 hover:text-white hover:underline">{anime.title}</Link>
									<div className={`pointer-events-none bg-opacity-80 font-bold ${classificacaoIndicativaCor(anime.censorship)} w-[max-content] rounded-lg px-2 py-1 text-xs my-auto`}>{anime.censorship == "0" ? "Livre" : "PG-" + anime.censorship}</div>
									<h1 className="text-xl font-bold mt-3">EPISÓDIO {episodios.n_episodio}</h1>
									<p className="text-sm w-full sm:w-[600px] text-zinc-400">{anime.synopsis}</p>
								</div>
								<div className="flex flex-col gap-10">
									{Object.keys(episodios.nextEp).length > 0 && (
										<div>
											<h2 className="font-semibold text-md">PRÓXIMO EPISÓDIO</h2>
										  <div className="w-full sm:w-[290px] transition-transform duration-300 hover:scale-105 mt-2">
										    <div className="mb-2">
										      <Link href={`/assistir/anime/${episodios.nextEp.anime.slug_serie}/${episodios.nextEp.generate_id}`}>
										        <div className="relative w-full sm:w-[290px] h-[200px] sm:h-[160.5px]">
			                        <Image 
			                          className="w-full h-full rounded-lg object-cover" 
			                          src={`https://static.anroll.net/images/animes/screens/${episodios.nextEp.anime.slug_serie}/${episodios.nextEp.n_episodio}.jpg`} 
			                          width={1200}
			                          height={1200}
			                          priority={true}
			                          quality={100}
			                          alt={`${episodios.nextEp.anime.titulo}`} 
			                        />
			                        <div className="absolute top-0 bg-black bg-opacity-30 w-full h-full">
			                          <div>
			                            <FaCirclePlay size={40} className="text-white mx-auto mt-[22%]" />
			                          </div>
			                        </div>
										          <div className="absolute w-full top-0 p-2 flex justify-between items-center">
										            { anime.extra_data.dub > 0 ? (
										              <div className="pointer-events-none bg-opacity-80 font-bold bg-purple-500 w-[max-content] rounded-lg px-2 text-sm">DUB</div>
										            ) : (
										              <div className="pointer-events-none bg-opacity-80 font-bold bg-red-500 w-[max-content] rounded-lg px-2 text-sm">LEG</div>
										            )}
										            <div className="pointer-events-none bg-opacity-80 font-bold bg-zinc-800 w-[max-content] rounded-lg px-2 text-sm">{episodios.nextEp.n_episodio}</div>
										          </div>
										        </div>
										      </Link>
										    </div>
											</div>
										</div>
									)}
									{Object.keys(episodios.prevEp).length > 0 && (
										<div>
											<h2 className="font-semibold text-md">EPISÓDIO ANTERIOR</h2>
										  <div className="w-full sm:w-[290px] transition-transform duration-300 hover:scale-105 mt-2">
										    <div className="mb-2">
										      <Link href={`/assistir/anime/${episodios.prevEp.anime.slug_serie}/${episodios.prevEp.generate_id}`}>
										        <div className="relative w-full sm:w-[290px] h-[200px] sm:h-[160.5px]">
			                        <Image 
			                          className="w-full h-full rounded-lg object-cover" 
			                          src={`https://static.anroll.net/images/animes/screens/${episodios.prevEp.anime.slug_serie}/${episodios.prevEp.n_episodio}.jpg`} 
			                          width={1200}
			                          height={1200}
			                          priority={true}
			                          quality={100}
			                          alt={`${episodios.prevEp.anime.titulo}`} 
			                        />
			                        <div className="absolute top-0 bg-black bg-opacity-30 w-full h-full">
			                          <div>
			                            <FaCirclePlay size={40} className="text-white mx-auto mt-[22%]" />
			                          </div>
			                        </div>
										          <div className="absolute w-full top-0 p-2 flex justify-between items-center">
										            { anime.extra_data.dub > 0 ? (
										              <div className="pointer-events-none bg-opacity-80 font-bold bg-purple-500 w-[max-content] rounded-lg px-2 text-sm">DUB</div>
										            ) : (
										              <div className="pointer-events-none bg-opacity-80 font-bold bg-red-500 w-[max-content] rounded-lg px-2 text-sm">LEG</div>
										            )}
										            <div className="pointer-events-none bg-opacity-80 font-bold bg-zinc-800 w-[max-content] rounded-lg px-2 text-sm">{episodios.prevEp.n_episodio}</div>
										          </div>
										        </div>
										      </Link>
										    </div>
											</div>
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