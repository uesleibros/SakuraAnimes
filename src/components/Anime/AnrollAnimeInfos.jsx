"use client";

import {useEffect, useState, useCallback} from "react";
import {Card, CardHeader, CardBody, CardFooter, Chip} from "@nextui-org/react";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Button} from "@nextui-org/react";
import {Divider, Spinner} from "@nextui-org/react";
import {FaPlay, FaCirclePlay, FaLink} from "react-icons/fa6";
import Episode from "@/components/Episode";
import AnimeSliderItems from "@/components/AniList/AnimeSliderItems";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import toSlug from "@/utils/toSlug";

export default function AnrollAnimeInfos({anime}) {
	const [animeAnroll, setAnimeAnroll] = useState(null);
	const [page, setPage] = useState(1);
	const [maisDetalhes, setMaisDetalhes] = useState(false);
	const [reachTotalPages, setReachTotalPages] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [episodios, setEpisodios] = useState([]);
	const [mounted, setMounted] = useState(false);
	const dias = ["Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado", "Domingo"];

	useEffect(() => {
    setMounted(true);
  }, []);

	useEffect(() => {
		async function tentaPegarDadosAnimeAnroll(title) {
			const res = await fetch(`/api/buscar/animes/anroll?q=${title.replace('×', 'x')}`);
			if (res.ok) {
				const {data} = await res.json();

				if (data.length > 0) {
					return data[0];
				}

				return null
			}
		}
		async function pegarDadosAnimeAnroll(title) {
			const res = await fetch(`/api/buscar/animes/anroll?q=${title.replace('×', 'x')}`);
			if (res.ok) {
				const {data} = await res.json();

				if (data.length > 0) {
					setAnimeAnroll(data[0]);
				} else {
					const try1 = await tentaPegarDadosAnimeAnroll(anime.synonyms[0]);
					const try2 = await tentaPegarDadosAnimeAnroll(anime.title.english);
					const try3 = await tentaPegarDadosAnimeAnroll(toSlug(anime.title.english));

					console.log(try1, try2, try3);

					if (try1) {
						setAnimeAnroll(try1);
					} else if (try2) {
						setAnimeAnroll(try2)
					} else if (try3) {
						setAnimeAnroll(try3);
					}
				}
			}
		}

		pegarDadosAnimeAnroll(anime.title.romaji);
	}, [anime]);

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

	return (
		<div>
			{mounted && (
				<>
					{typeof window !== "undefined" && animeAnroll?.type === "movie" && (
						<Script 
						  src="/lib/playerjs.js"
						  strategy="afterInteractive"
						  onReady={() => {
						  	var player = new Playerjs({ id:"player", file:`/api/streaming/anroll/${animeAnroll.slug}/media.m3u8` });
						  }}
						/>
					)}
					{maisDetalhes && (
						<div className="mt-5 flex flex-col gap-2">
							<div className="flex justify-between">
								<div>
									<h3 className="font-semibold text-sm">Gêneros</h3>
								</div>
								<div className="flex items-center gap-2 flex-wrap w-[300px] justify-end">
									{anime.genres.map((genre, index) => (
										<p className="text-xs" key={index}>{genre}{(index < anime.genres.length - 1) && ","}</p>
									))}
								</div>
							</div>
							<Divider />
							<div className="flex justify-between">
								<div>
									<h3 className="font-semibold text-sm">Produtores</h3>
								</div>
								<div className="flex items-center gap-2 flex-wrap w-[300px] justify-end">
									{anime.studios.edges.filter(i => !i.node.isAnimationStudio).map((producer, index) => (
										<Link href={`${producer.node.siteUrl}`} className="text-xs transition-colors text-blue-500 hover:text-white hover:underline" key={index}>{producer.node.name}{(index < anime.studios.edges.filter(i => !i.node.isAnimationStudio).length - 1) && ","}</Link>
									))}
								</div>
							</div>
							<Divider />
							<div className="flex justify-between">
								<div>
									<h3 className="font-semibold text-sm">Estudios</h3>
								</div>
								<div className="flex items-center gap-2 flex-wrap w-[300px] justify-end">
									{anime.studios.edges.filter(i => i.node.isAnimationStudio).map((licensor, index) => (
										<Link href={`${licensor.node.siteUrl}`} className="text-xs transition-colors text-blue-500 hover:text-white hover:underline" key={index}>{licensor.node.name}{(index < anime.studios.edges.filter(i => i.node.isAnimationStudio).length - 1) && ","}</Link>
									))}
								</div>
							</div>
							<Divider />
							<div className="flex flex-col gap-2">
								{anime.externalLinks.map((external, index) => (
									<Link className="text-sm transition-colors text-blue-500 hover:text-white flex items-center gap-2 w-[max-content]" href={`${external.url}`} key={index}>
										<FaLink />
										{external.icon && (
											<Image src={`${external.icon}`} width={10} height={10} alt={`${external.site}`} />
										)}
										{external.site}
									</Link>
								))}
							</div>
							<Divider />
							<h3 className="font-semibold text-sm">Equipe</h3>
							<div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
								{anime.staff.edges.slice(0, Math.min(anime.staff.edges.length, 12)).map((staff, index) => (
									<Card className="max-w-[400px] h-full" key={index}>
							      <CardHeader className="flex gap-3">
							        <Image
							        	className="rounded-lg"
							          alt={`${staff.node.name.full}`}
							          height={40}
							          src={`${staff.node.image.large}`}
							          width={40}
							        />
							        <div className="flex flex-col">
							          <p className="text-md">{staff.node.name.full}</p>
							          <div className="flex flex-wrap gap-2">
							          	{staff.node.primaryOccupations.length > 1 ? (
		      	                <Dropdown>
		      	                  <DropdownTrigger>
		      	                    <Chip className="cursor-pointer" size="sm" variant="solid">
		      	                      {staff.node.primaryOccupations[0]} <span className="text-xs ml-2">(Ver mais)</span>
		      	                    </Chip>
		      	                  </DropdownTrigger>
		      	                  <DropdownMenu aria-label="Cargos adicionais">
		      	                    {staff.node.primaryOccupations.map((position, idx) => (
		      	                      <DropdownItem isDisabled={true} key={idx}>{position}</DropdownItem>
		      	                    ))}
		      	                  </DropdownMenu>
		      	                </Dropdown>
		      	              ) : (
		      	                <Chip size="sm" variant="bordered">{staff.node.primaryOccupations[0]}</Chip>
		      	              )}
							          </div>
							        </div>
							      </CardHeader>
							      <Divider />
							      <CardFooter className="mt-auto">
							        <Link className="transition-colors text-blue-500 hover:text-white flex items-center gap-2 w-[max-content]" href={`${staff.node.siteUrl}`}>
												<FaLink />
												Saiba mais
											</Link>
							      </CardFooter>
							    </Card>
								))}
							</div>
							<Divider />
							<h3 className="font-semibold text-sm">Personagens Principais</h3>
							<div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
								{anime.characters.edges.filter(i => i.role === "MAIN").map((character, index) => (
									<Card className="max-w-[400px] h-full" key={index}>
							      <CardHeader className="flex gap-3">
							        <Image
							        	className="rounded-lg"
							          alt={`${character.node.name.full}`}
							          height={40}
							          src={`${character.node.image.large}`}
							          width={40}
							        />
							        <div className="flex flex-col">
							          <p className="text-md">{character.node.name.full}</p>
							          <div className="flex flex-wrap gap-2">
							          	<Chip size="sm" variant="bordered">{character.voiceActors[0].name.full} - {character.voiceActors[0].languageV2}</Chip>
							          </div>
							        </div>
							      </CardHeader>
							      <Divider />
							      <CardFooter className="mt-auto">
							        <Link className="transition-colors text-blue-500 hover:text-white flex items-center gap-2 w-[max-content]" href={`${character.node.siteUrl}`}>
												<FaLink />
												Saiba mais
											</Link>
							      </CardFooter>
							    </Card>
								))}
							</div>
							<Divider className="mb-2" />
						</div>
					)}
					<div className="mt-2">
						<h3 className="font-bold transition-colors text-zinc-400 hover:text-white text-xs cursor-pointer w-[max-content]" onClick={handleMaisDetalhes}>
							{maisDetalhes ? "MENOS DETALHES" : "MAIS DETALHES"}
						</h3>
					</div>
					{animeAnroll?.type === "movie" && (
						<div className="mt-10">
							<div id="player"></div>
						</div>
					)}
					{episodios.length > 0 && (
						<div className="mt-10">
							<div>
								<h2 className="text-xl font-bold">EPISÓDIOS</h2>
								<div className="grid grid-cols-1 sm:grid-cols-4 gap-10 mt-10">
									{episodios.map((episodio, index) => (
									  <Episode slug={animeAnroll.slug} episode_id={episodio.generate_id} episode_number={episodio.n_episodio} dub={animeAnroll.extra_data.dub} thumbnail={episodio.thumbnail} key={index} />
									))}
								</div>
							</div>
						</div>
					)}
					{isLoadingMore && (
		        <div className="flex items-center justify-center mt-5">
		          <Spinner size="lg" />
		        </div>
		      )}
					{(animeAnroll?.type === "anime" && !reachTotalPages) && (
						<div className="mx-auto text-center mt-6">
              <button onClick={() => carregarMaisEpisodios(page)} className="relative border border-blue-500 transition-colors hover:border-blue-600 uppercase font-bold py-2 w-full">
                Carregar mais episódios
              </button>
            </div>
					)}
					<div className="mt-3">
						<h2 className="text-xl font-bold">RECOMENDADOS</h2>
						<div className="mt-5">
							<AnimeSliderItems items={anime.recommendations.edges} node="node.mediaRecommendation" />
						</div>
					</div>
				</>
			)}
		</div>
	);
}
