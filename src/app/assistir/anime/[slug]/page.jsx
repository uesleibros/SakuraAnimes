"use client";

import {useEffect, useState, useCallback} from "react";
import {FaPlay, FaCirclePlay} from "react-icons/fa6";
import {Divider, Spinner} from "@nextui-org/react";
import CustomImage from "@/components/CustomImage";
import Link from "next/link";
import toTitleCase from "@/utils/toTitleCase";
import Script from "next/script";
import classificacaoIndicativaCor from "@/utils/classificacaoIndicativaCor";
import generosFormato from "@/utils/generosFormato";

export default function VerAnime({params}) {
	const [anime, setAnime] = useState(null);
	const [page, setPage] = useState(1);
	const [reachTotalPages, setReachTotalPages] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [episodios, setEpisodios] = useState([]);
	const dias = ["Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado", "Domingo"];
	const {slug} = params;

	useEffect(() => {
		async function pegarDadosAnime() {
			const res = await fetch(`/api/buscar/animes/anroll?q=${slug}`);
			const {data} = await res.json();

			if (data.length > 0 && data[0].slug === slug) {
				setAnime(data[0]);
				document.title = data[0].title;
			}
		}

		pegarDadosAnime();
	}, [slug]);

	const carregarMaisEpisodios = useCallback(async (pageId) => {
		if (isLoadingMore || !anime) return;

		if (anime.type === "movie") {
			setReachTotalPages(true);
			return;
		}
		setIsLoadingMore(true);

		try {
			const res = await fetch(`/api/buscar/animes/anroll/episodios?id=${anime.id}&page=${pageId}`);
			const {data} = await res.json();

			if (res.ok && data.length > 0) {
				setEpisodios((prevEpisodios) => [...prevEpisodios, ...data]);
				setPage(pageId + 1);
			} else {
				setReachTotalPages(true);
			}
		} catch (error) {
			console.error("Erro ao carregar mais episódios:", error);
		} finally {
			setIsLoadingMore(false);
		}
	}, [isLoadingMore, anime]);

	useEffect(() => {
		const onscroll = () => {
			if (!anime || isLoadingMore || reachTotalPages) return;

			const scrolledTo = window.scrollY + window.innerHeight;
			const isReachBottom = scrolledTo > document.body.scrollHeight - 500;

			if (isReachBottom && page !== anime.page) {
				carregarMaisEpisodios(page);
			}
		};

		window.addEventListener("scroll", onscroll);
		return () => {
			window.removeEventListener("scroll", onscroll);
		};
	}, [anime, page, isLoadingMore, carregarMaisEpisodios, reachTotalPages]);

	return (
		<main className="min-h-screen">
			{anime?.type === "movie" && (
				<Script 
				  src="/lib/playerjs.js"
				  strategy="afterInteractive"
				  onReady={() => {
				  	var player = new Playerjs({ id:"player", file:`/api/streaming/anroll/${slug}/media.m3u8`, title: `${anime.title}` });
				  }}
				/>
			)}
			<div className="mt-20 pb-20 px-[16px] mx-auto max-w-[1240px] w-full">
				{anime ? (
					<div>
						<div className="absolute left-0 top-0 z-0 w-full inset-0 h-[400px]">
							<CustomImage
									className="w-full h-full object-cover blur brightness-50"
									src={`${anime.thumbnail}`}
									placeholderImage="/capa-ne.jpg"
									width={1200}
									height={1200}
									quality={100}
								/>
						</div>
						<div className="flex relative z-10 flex-col gap-4">
							<div className="max-w-[224.45px] max-h-[323.28px]">
								<CustomImage
									className="rounded w-full h-[323.28px] shadowm-sm"
									src={`${anime.thumbnail}`}
									placeholderImage="/capa-ne.jpg"
									width={1200}
									height={1200}
									quality={100}
								/>
							</div>
							<div>
								<div className="flex items-center gap-5">
									<div>
										<h2 className="font-bold text-3xl">{anime.title}</h2>
									</div>
									<div className="text-xs -ml-4">
										<p className="font-bold select-none">({anime.year})</p>
									</div>
								</div>
								{anime.extra_data?.generos && (
									<div className="flex flex-wrap sm:w-[380px] items-center gap-3 mb-5 mt-3">
										{anime.extra_data.generos.split(",").map((genero, index) => (
											<div key={index} className="pointer-events-none font-bold bg-gray-900 flex-shrink-0 w-[max-content] rounded-lg px-2 py-1 text-xs flex items-center gap-2">{toTitleCase(generosFormato(genero))}</div>
										))}
									</div>
								)}
								<div className="mt-2 flex items-center gap-3">
									<div>
										<div className={`pointer-events-none bg-opacity-80 font-bold ${classificacaoIndicativaCor(anime.censorship)} w-[max-content] rounded-lg px-2 py-1 text-xs my-auto`}>{anime.censorship == "0" ? "Livre" : "PG-" + anime.censorship}</div>
									</div>
									{anime.type === "anime" && (
										<div>
											<div className="pointer-events-none bg-opacity-80 font-bold bg-black w-[max-content] rounded-lg px-2 py-1 text-xs flex items-center gap-2"><FaPlay /> Episódios {anime.total_eps}</div>
										</div>
									)}
								</div>
								<div className="mt-3">
									<p className="text-sm w-[85%]">{anime.synopsis}</p>
								</div>
							</div>
						</div>
						<div className="mt-3 flex items-center gap-2">
							<div className="w-[max-content]">
								<p className="font-bold text-xs w-[max-content]">{anime.type === "movie" ? (anime.extra_data.data_movie.duracao.length > 1 ? anime.extra_data.data_movie.duracao : "não calculado") : (anime.extra_data.duracao.length > 1 ? anime.extra_data.duracao : "não calculado")}</p>
							</div>
							<div className="w-full">
								<Divider />
							</div>
						</div>
						{anime.extra_data?.calendar_anime && (
							<div className="mt-3 bg-blue-500 p-2">
								<h3 className="text-center text-zinc-950 font-semibold">Acompanhe novos episódios todo(a) <strong>{dias[anime.extra_data.calendar_anime.day]}</strong>.</h3>
							</div>
						)}
						{anime.type === "movie" && (
							<div className="mt-10">
								<div id="player"></div>
							</div>
						)}

						{episodios.length > 0 && (
							<div className="mt-10">
								<div>
									<h2 className="text-2xl font-bold">EPISÓDIOS</h2>
									<div className="grid grid-cols-1 sm:grid-cols-4 gap-10 mt-10">
										{episodios.map((episodio, index) => (
										  <div className="w-full sm:w-[290px] transition-transform duration-300 hover:scale-105" key={index}>
										    <div className="mb-2">
										      <Link href={`/assistir/anime/${episodio.anime.slug_serie}/${episodio.generate_id}`}>
										        <div className="relative w-full sm:w-[290px] h-[200px] sm:h-[160.5px]">
			                        <CustomImage 
			                          className="w-full h-full rounded-lg object-cover" 
			                          src={`${episodio.thumbnail}`} 
			                          width={1200}
			                          height={1200}
			                          priority={true}
			                          quality={100}
			                          placeholderImage={`${episodio.anime.thumbnail}`}
			                          alt={`${episodio.anime.titulo}`} 
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
										            <div className="pointer-events-none bg-opacity-80 font-bold bg-zinc-800 w-[max-content] rounded-lg px-2 text-sm">{episodio.n_episodio}</div>
										          </div>
										        </div>
										      </Link>
										    </div>
										    <p className="truncate font-semibold text-[10px] uppercase text-zinc-400 -mt-1 w-full">{episodio.anime.titulo}</p>
										  </div>
										))}
									</div>
								</div>
							</div>
						)}
					</div>
				) : (
					<div>
						<Spinner />
						<p className="text-xs w-[350px] mt-2">
							Caso demore para carregar o componente, provavelmente o conteúdo que você está tentando acessar não existe.
						</p>
					</div>
				)}
				{isLoadingMore && (
          <div className="flex items-center justify-center mt-5">
            <Spinner size="lg" />
          </div>
        )}
			</div>
		</main>
	);
}
