"use client";

import {useEffect, useState, useCallback} from "react";
import {FaPlay, FaCirclePlay, FaLink } from "react-icons/fa6";
import {Divider, Spinner} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter, Chip} from "@nextui-org/react";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Button} from "@nextui-org/react"
import Image from "next/image";
import Link from "next/link";
import toTitleCase from "@/utils/toTitleCase";
import Script from "next/script";
import generosFormato from "@/utils/generosFormato";

export default function VerAnime({params}) {
	const [anime, setAnime] = useState(null);
	const [animeAnroll, setAnimeAnroll] = useState(null);
	const [animeStaff, setAnimeStaff] = useState(null);
	const [animeActors, setAnimeActors] = useState(null);
	const [page, setPage] = useState(1);
	const [maisDetalhes, setMaisDetalhes] = useState(false);
	const [reachTotalPages, setReachTotalPages] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [episodios, setEpisodios] = useState([]);
	const dias = ["Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado", "Domingo"];
	const {slug} = params;

	useEffect(() => {
		async function pegarDadosAnime() {
			const res = await fetch(`/api/especifico/animes/myanimelist?id=${slug}`);
			const {data} = await res.json();

			if (Object.keys(data).length > 0) {
				setAnime(data);
				await pegarDadosAnimeAnroll(data.title);
				document.title = data.title;
			}
		}

		async function pegarDadosAnimeAnroll(title) {
			const res = await fetch(`/api/buscar/animes/anroll?q=${title}`);
			if (res.ok) {
				const {data} = await res.json();

				if (data.length > 0 && data[0].title.includes(title)) {
					setAnimeAnroll(data[0]);
					await pegarDadosAnimeStaff();
				}
			}
		}

		async function pegarDadosAnimeStaff() {
			const res = await fetch(`/api/especifico/animes/myanimelist/staff?id=${slug}`);

			if (res.ok) {
				const {data} = await res.json();

				if (Object.keys(data).length > 0) {
					setAnimeStaff(data);
					await pegarDadosAnimeAtores();
				}
			}
		}

		async function pegarDadosAnimeAtores() {
			const res = await fetch(`/api/especifico/animes/myanimelist/atores?id=${slug}`);

			if (res.ok) {
				const {data} = await res.json();

				if (Object.keys(data).length > 0) {
					setAnimeActors(data);
				}
			}
		}

		pegarDadosAnime();
	}, [slug]);

	function handleMaisDetalhes() {
		setMaisDetalhes(prev => !prev);
	}

	const carregarMaisEpisodios = useCallback(async (pageId) => {
		if (isLoadingMore || !animeAnroll) return;

		if (animeAnroll.type === "movie") {
			setReachTotalPages(true);
			return;
		}
		setIsLoadingMore(true);

		try {
			const res = await fetch(`/api/buscar/animes/anroll/episodios?id=${animeAnroll.id}&page=${pageId}`);
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
	}, [isLoadingMore, animeAnroll]);

	useEffect(() => {
		const onscroll = () => {
			if (!animeAnroll || isLoadingMore || reachTotalPages) return;

			const scrolledTo = window.scrollY + window.innerHeight;
			const isReachBottom = scrolledTo > document.body.scrollHeight - 500;

			if (isReachBottom && page !== animeAnroll.page) {
				carregarMaisEpisodios(page);
			}
		};

		window.addEventListener("scroll", onscroll);
		return () => {
			window.removeEventListener("scroll", onscroll);
		};
	}, [animeAnroll, page, isLoadingMore, carregarMaisEpisodios, reachTotalPages]);

	return (
		<main className="min-h-screen">
			{(anime?.type === "Movie") && (
				<Script 
				  src="/lib/playerjs.js"
				  strategy="afterInteractive"
				  onReady={() => {
				  	var player = new Playerjs({ id:"player", file:`/api/streaming/anroll/${animeAnroll.slug}/media.m3u8` });
				  }}
				/>
			)}
			<div className="mt-20 pb-20 px-[16px] mx-auto max-w-[1240px] w-full">
				{anime ? (
					<div>
						<div className="absolute left-0 top-0 z-0 w-full inset-0 h-[400px]">
							<Image
									className="w-full h-full object-cover blur brightness-50"
									src={`${anime.images.jpg.large_image_url}`}
									width={1200}
									height={1200}
									quality={100}
								  alt={`${anime.title}`}
								/>
						</div>
						<div className="flex relative z-10 flex-col gap-4">
							<div className="max-w-[224.45px] max-h-[323.28px]">
								<Image
									className="rounded w-full h-[323.28px] shadowm-sm"
									src={`${anime.images.jpg.large_image_url}`}
									width={1200}
									height={1200}
									quality={100}
									alt={`${anime.title}`}
								/>
							</div>
							<div>
								<div className="flex max-[640px]:flex-col items-center gap-5">
									<div>
										<h2 className="font-bold text-3xl">{anime.title}</h2>
									</div>
									<div className="text-xs -ml-4">
										<p className="font-bold select-none">({anime.aired.prop.from.year ? anime.aired.prop.from.year : "Não lançado"})</p>
									</div>
								</div>
								<div className="mt-3 flex items-center gap-2">
									<p className="text-sm w-full">{anime.synopsis}</p>
								</div>
							</div>
						</div>
						{maisDetalhes && (
							<div className="mt-5 flex flex-col gap-2">
								<div className="flex justify-between">
									<div>
										<h3 className="font-semibold text-sm">Gêneros</h3>
									</div>
									<div className="flex items-center gap-2 flex-wrap max-w-[500px] justify-end">
										{anime.genres.map((genre, index) => (
											<p className="text-xs" key={index}>{genre.name}{(index < anime.genres.length - 1) && ","}</p>
										))}
									</div>
								</div>
								<Divider />
								<div className="flex justify-between">
									<div>
										<h3 className="font-semibold text-sm">Classificação Indicativa</h3>
									</div>
									<div className="flex items-center gap-2 flex-wrap max-w-[500px] justify-end">
										<p className="text-xs">{anime.rating}</p>
									</div>
								</div>
								<Divider />
								<div className="flex justify-between">
									<div>
										<h3 className="font-semibold text-sm">Produtores</h3>
									</div>
									<div className="flex items-center gap-2 flex-wrap max-w-[500px] justify-end">
										{anime.producers.map((producer, index) => (
											<p className="text-xs" key={index}>{producer.name}{(index < anime.producers.length - 1) && ","}</p>
										))}
									</div>
								</div>
								<Divider />
								<div className="flex justify-between">
									<div>
										<h3 className="font-semibold text-sm">Licensiadores</h3>
									</div>
									<div className="flex items-center gap-2 flex-wrap max-w-[500px] justify-end">
										{anime.licensors.map((licensor, index) => (
											<p className="text-xs" key={index}>{licensor.name}{(index < anime.licensors.length - 1) && ","}</p>
										))}
									</div>
								</div>
								<Divider />
								<div className="flex justify-between">
									<div>
										<h3 className="font-semibold text-sm">Estudios</h3>
									</div>
									<div className="flex items-center gap-2 flex-wrap max-w-[500px] justify-end">
										{anime.studios.map((studio, index) => (
											<p className="text-xs" key={index}>{studio.name}{(index < anime.studios.length - 1) && ","}</p>
										))}
									</div>
								</div>
								<Divider />
								<div className="flex flex-col gap-2">
									{anime.external.map((external, index) => (
										<Link className="text-sm transition-colors text-blue-500 hover:text-white flex items-center gap-2 w-[max-content]" href={`${external.url}`} key={index}>
											<FaLink />
											{external.name}
										</Link>
									))}
								</div>
								<Divider />
								<div>
									<h3 className="font-semibold text-sm">Aberturas</h3>
									<ul className="flex flex-col gap-1 mt-2">
										{anime.theme.openings.map((opening, index) => (
											<li className="text-xs" key={index}>{opening}</li>
										))}
										{anime.theme.openings.length === 0 && <li className="text-xs">Sem aberturas.</li>}
									</ul>
								</div>
								<Divider />
								<div>
									<h3 className="font-semibold text-sm">Encerramentos</h3>
									<ul className="flex flex-col gap-1 mt-2">
										{anime.theme.endings.map((ending, index) => (
											<li className="text-xs" key={index}>{ending}</li>
										))}
										{anime.theme.endings.length === 0 && <li className="text-xs">Sem encerramentos.</li>}
									</ul>
								</div>
								<Divider />
								<h3 className="font-semibold text-sm">Equipe</h3>
								{animeStaff ? (
									<div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
										{animeStaff.slice(0, 12).map((staff, index) => (
											<Card className="max-w-[400px] h-full" key={index}>
									      <CardHeader className="flex gap-3">
									        <Image
									        	className="rounded-lg"
									          alt={`${staff.person.name}`}
									          height={40}
									          src={`${staff.person.images.jpg.image_url}`}
									          width={40}
									        />
									        <div className="flex flex-col">
									          <p className="text-md">{staff.person.name}</p>
									          <div className="flex flex-wrap gap-2">
									          	{staff.positions.length > 1 ? (
		          	                <Dropdown>
		          	                  <DropdownTrigger>
		          	                    <Chip className="cursor-pointer" size="sm" variant="solid">
		          	                      {staff.positions[0]} <span className="text-xs ml-2">(Ver mais)</span>
		          	                    </Chip>
		          	                  </DropdownTrigger>
		          	                  <DropdownMenu aria-label="Cargos adicionais">
		          	                    {staff.positions.map((position, idx) => (
		          	                      <DropdownItem isDisabled={true} key={idx}>{position}</DropdownItem>
		          	                    ))}
		          	                  </DropdownMenu>
		          	                </Dropdown>
		          	              ) : (
		          	                <Chip size="sm" variant="bordered">{staff.positions[0]}</Chip>
		          	              )}
									          </div>
									        </div>
									      </CardHeader>
									      <Divider />
									      <CardFooter className="mt-auto">
									        <Link className="transition-colors text-blue-500 hover:text-white flex items-center gap-2 w-[max-content]" href={`${staff.person.url}`}>
														<FaLink />
														Saiba mais
													</Link>
									      </CardFooter>
									    </Card>
										))}
									</div>
								) : (
									<Spinner />
								)}
								<Divider />
								<h3 className="font-semibold text-sm">Personagens Principais</h3>
								{animeActors ? (
									<div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
										{animeActors
								      .filter((actor) => actor.role === "Main")
								      .map((actor, index) => (
											<Card className="max-w-[400px] h-full" key={index}>
									      <CardHeader className="flex gap-3">
									        <Image
									        	className="rounded-lg"
									          alt={`${actor.character.name}`}
									          height={40}
									          src={`${actor.character.images.jpg.image_url}`}
									          width={40}
									        />
									        <div className="flex flex-col">
									          <p className="text-md">{actor.character.name}</p>
									          <div className="flex flex-wrap gap-2">
									          	{actor.voice_actors.length > 1 ? (
		          	                <Dropdown>
		          	                  <DropdownTrigger>
		          	                    <Chip className="cursor-pointer" size="sm" variant="solid">
		          	                      {actor.voice_actors[0].person.name} <span className="text-xs ml-2">(Ver mais)</span>
		          	                    </Chip>
		          	                  </DropdownTrigger>
		          	                  <DropdownMenu aria-label="Cargos adicionais">
		          	                    {actor.voice_actors.slice(0, 6).map((voice_actor, idx) => (
		          	                      <DropdownItem isDisabled={true} key={idx}>{voice_actor.person.name} - {voice_actor.language}</DropdownItem>
		          	                    ))}
		          	                  </DropdownMenu>
		          	                </Dropdown>
		          	              ) : (
		          	                <Chip size="sm" variant="bordered">{actor.voice_actors[0]?.person.name} - {actor.voice_actors[0]?.language}</Chip>
		          	              )}
									          </div>
									        </div>
									      </CardHeader>
									      <Divider />
									      <CardFooter className="mt-auto">
									        <Link className="transition-colors text-blue-500 hover:text-white flex items-center gap-2 w-[max-content]" href={`${actor.character.url}`}>
														<FaLink />
														Saiba mais
													</Link>
									      </CardFooter>
									    </Card>
										))}
									</div>
								) : (
									<Spinner />
								)}
								<Divider className="mb-2" />
							</div>
						)}
						<div className="mt-2">
							<h3 className="font-bold transition-colors text-zinc-400 hover:text-white text-xs cursor-pointer w-[max-content]" onClick={handleMaisDetalhes}>
								{maisDetalhes ? "MENOS DETALHES" : "MAIS DETALHES"}
							</h3>
						</div>
						{anime.type === "Movie" && (
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
										      <Link href={`/assistir/anime/${animeAnroll.slug}/${episodio.generate_id}`}>
										        <div className="relative w-full sm:w-[290px] h-[200px] sm:h-[160.5px]">
			                        <Image 
			                          className="w-full h-full rounded-lg object-cover" 
			                          src={`${episodio.thumbnail}`} 
			                          width={1200}
			                          height={1200}
			                          priority={true}
			                          quality={100}
			                          alt={`${episodio.anime.titulo}`} 
			                        />
			                        <div className="absolute top-0 bg-black bg-opacity-30 w-full h-full">
			                          <div>
			                            <FaCirclePlay size={40} className="text-white mx-auto mt-[22%]" />
			                          </div>
			                        </div>
										          <div className="absolute w-full top-0 p-2 flex justify-between items-center">
										            { animeAnroll.extra_data.dub > 0 ? (
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
