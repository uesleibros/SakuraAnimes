"use client";

import {useEffect, useState} from "react";
import formatAiringEpisode from "@/utils/formatAiringEpisode";
import AnrollAnimeInfos from "@/components/Anime/AnrollAnimeInfos";
import Image from "next/image";
import Chart from "chart.js";

export default function AnimeInfos({anime}) {
	const [animeTabOverview, setAnimeTabOverview] = useState(true);

	useEffect(() => {
		const nomesTraduzidos = new Map([
			["current", "Assistindo atualmente"],
			["paused", "Parou de assistir"],
			["dropped", "Dropou"],
			["completed", "Terminou de assistir"],
			["planning", "Planeja assistir"]
		]);
		const chartLabels = anime.stats.statusDistribution.map(item => nomesTraduzidos.get(item.status.toLowerCase()));
		const backgroundColors = [
		  "rgba(104, 214, 57, 0.7)",       		// Verde
		  "rgba(2, 169, 255, 0.7)",       	 // Azul
		  "rgba(146, 86, 243, 0.7)",      	// Roxo
		  "rgba(247, 121, 164, 0.7)",      // Rosa
		  "rgba(245, 0, 0, 0.7)",					// Vermelho
		];

    const config = {
		  type: "pie",
		  responsive: true,
		  data: {
		    labels: chartLabels,
		    datasets: [
		    	{
		    		label: "Quantidade de Pessoas",
		    		data: anime.stats.statusDistribution.map(item => item.amount),
		    		backgroundColor: backgroundColors,
		    		borderColor: backgroundColors,
		    		fill: false
		    	}
		    ]
		  },
		  options: {
		  	legend: {
          display: true,
          position: "bottom"
        },
		    scales: {
		      y: {
		        beginAtZero: true
		      }
		    }
		  }
		};

    var ctx = document.getElementById("line-chart");

    if (ctx) {
    	ctx.getContext("2d");
    	window.myLine = new Chart(ctx, config);
    }
  }, [anime]);
	return (
		<div>
			<div className="relative z-0 w-full inset-0 h-[400px]">
				<Image
					className="w-full h-full object-cover filter brightness-50 select-none pointer-events-none"
					src={`${anime.bannerImage || anime.coverImage.large}`}
					width={1200}
					height={1200}
					quality={100}
				  alt={`${anime.title.romaji}`}
				/>
			</div>
			<div className="pb-20 px-[16px] mx-auto max-w-[1240px] w-full">
				<div>
					<div className="flex relative z-10 gap-10 max-[640px]:flex-col items-center -mt-[10px] sm:-mt-[90px]">
						<div className="max-w-[224.45px] max-h-[323.28px] self-start shrink-0">
							<Image
								className="rounded w-full h-[323.28px] shadowm-sm select-none pointer-events-none"
								src={`${anime.coverImage.large}`}
								width={1200}
								height={1200}
								quality={100}
								alt={`${anime.title.romaji}`}
							/>
						</div>
						<div className="mt-auto sm:pt-[130px]">
							<div>
								<div>
									<h2 className="font-bold text-3xl">{anime.title.romaji}</h2>
								</div>
							</div>
							<div className="text-xs mt-1">
								<p className="font-bold select-none">({anime.startDate?.year ? anime.startDate.year : "Não lançado"})</p>
							</div>
							{anime.nextAiringEpisode && (
								<div className="w-full mt-1">
									<p className="text-blue-500 select-none text-xs font-bold">{formatAiringEpisode(anime.nextAiringEpisode)}</p>
								</div>
							)}
							<div className="mt-3 flex items-center gap-2">
								<p className="text-sm overflow-hidden max-w-[900px] text-ellipsis" style={{
						      display: "-webkit-box",
						      WebkitLineClamp: 4,
						      WebkitBoxOrient: "vertical",
						      overflow: "hidden",
						    }}>{anime.description.replace(/<[^>]*>/g, ' ')}</p>
							</div>
							<div className="flex items-center gap-10 mt-5">
								<p onClick={() => setAnimeTabOverview(true)} className={`${animeTabOverview && "border-b border-blue-500 text-blue-500 font-semibold"} cursor-pointer text-sm uppercase`}>Visão Geral</p>
								<p onClick={() => setAnimeTabOverview(false)} className={`${!animeTabOverview && "border-b border-blue-500 text-blue-500 font-semibold"} cursor-pointer text-sm uppercase`}>Estatísticas</p>
							</div>
						</div>
					</div>
					<div className={`${!animeTabOverview ? "relative mt-10" : "collapse h-0"}`}>
						<div>
							<h3 className="font-bold text-xl text-center">ESTATÍSTICAS DO ANIME</h3>
							<div className="grid grid-cols-1 sm:grid-cols-3 justify-center gap-3 items-center mt-5">
								<p className="rounded-sm p-2 bg-zinc-900 text-zinc-400 text-sm">
									Pontuação média: {anime.averageScore}%
								</p>
								<p className="rounded-sm p-2 bg-zinc-900 text-zinc-400 text-sm">
									Popularidade: {anime.popularity}
								</p>
								<p className="rounded-sm p-2 bg-zinc-900 text-zinc-400 text-sm">
									Favoritos: {anime.favourites}
								</p>
							</div>
						</div>
						<div className="mt-10">
							<h3 className="font-bold text-xl text-center">ESTATÍSTICAS DE USUÁRIOS QUE VIRAM O ANIME</h3>
							<canvas className="mt-5" id="line-chart"></canvas>
						</div>
					</div>
					{animeTabOverview && (
						<AnrollAnimeInfos anime={anime} />
					)}
				</div>
			</div>
		</div>
	);
}
