"use client";

import {useEffect, useState, useRef } from "react";
import {Spinner} from "@nextui-org/react";
import Episode from "@/components/Episode";
import AnimeSliderItems from "@/components/MAL/AnimeSliderItems";
import Image from "next/image";
import Link from "next/link";
import classificacaoIndicativaCor from "@/utils/classificacaoIndicativaCor";
import toSlug from "@/utils/toSlug";

export default function Home() {
  const [animesRecentes, setAnimesRecentes] = useState(null);
  const [animesPopulares, setAnimesPopulares] = useState(null);
  const [animesPopularesSaindo, setAnimesPopularesSaindo] = useState(null);
  const [animesTemporadaAtual, setAnimesTemporadaAtual] = useState(null);
  const settings = {
    infinite: true,
    slidesToShow: 6,
    speed: 500,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 2000,
          initialSlide: 0
        }
      },
    ]
  };

  useEffect(() => {
    async function pegarEpisodiosRecemAdicionados() {
      const res = await fetch("/api/recentes/animes/anroll");
      const data = await res.json();

      setAnimesRecentes(data.data.data_releases);
    }

    async function pegarAnimesPopulares() {
      const res = await fetch("/api/populares/animes/myanimelist");
      const data = await res.json();

      setAnimesPopulares(data.data);
    }

    async function pegarAnimesTemporadaAtual() {
      const res = await fetch("/api/populares/animes/myanimelist/temporada");
      const data = await res.json();

      setAnimesTemporadaAtual(data.data);
    }

    async function pegarAnimesPopularesSaindo() {
      const res = await fetch("/api/populares/animes/myanimelist/saindo");
      const data = await res.json();
      
      setAnimesPopularesSaindo(data.data);
    }

    pegarEpisodiosRecemAdicionados();
    pegarAnimesPopulares();
    pegarAnimesTemporadaAtual();
    pegarAnimesPopularesSaindo();
    return;
  }, []);

  return (
    <main>
      <div className="px-[16px] pb-10 mx-auto max-w-[1240px] w-full mt-10">
        <div className="mb-10">
          <Link href="/assistir/anime/54284">
            <Image
              className="max-[640px]:h-[160px]"
              src="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=2700/cr/desktop_large/31752e60-b3f4-415b-95a4-496903d66a68.png"
              width={1200}
              height={1200}
              quality={100}
              alt="Popular"
            />
          </Link>
        </div>
        <div>
          <div>
            <h2 className="text-xl font-bold">ÚLTIMOS LANÇAMENTOS</h2>
          </div>
          { animesRecentes ? (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 mt-5">
              {animesRecentes.map((animeRecente, index) => (
                <Episode slug={animeRecente.episode.anime.slug_serie} episode_id={animeRecente.episode.generate_id} episode_number={animeRecente.episode.n_episodio} dub={animeRecente.episode.dub} thumbnail={animeRecente.episode.thumbnail} title={animeRecente.episode.anime.titulo} key={index} />
              ))}
            </div>
          ) : (
            <div className="mt-5">
              <Spinner />
              <p className="text-xs w-[350px] mt-2">
                  Caso demore para carregar o componente, provavelmente pode ter ocorrido algum interno com um dos servidores, nesse caso reinicie a página.
                </p>
            </div>
          )}
        </div>
        <div className="mt-10">
          <Link href="/assistir/anime/57892">
            <Image
              className="max-[640px]:h-[160px]"
              src="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=2700/cr/desktop_large/30033c32-049b-4618-8dcd-0a27d0601135.png"
              width={1200}
              height={1200}
              quality={100}
              alt="Popular"
            />
          </Link>
        </div>
        <div className="mt-10">
          <div>
            <h2 className="text-xl font-bold">MAIS POPULARES</h2>
          </div>
          <div className="mt-5 overflow-hidden">
            {animesPopulares ? (
              <AnimeSliderItems items={animesPopulares} />
            ) : (
              <div>
                <Spinner />
                <p className="text-xs w-[350px] mt-2">
                  Caso demore para carregar o componente, provavelmente pode ter ocorrido algum interno com um dos servidores, nesse caso reinicie a página.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-10">
          <div>
            <h2 className="text-xl font-bold">MAIS POPULARES EM LANÇAMENTO</h2>
          </div>
          <div className="mt-5 overflow-hidden">
            {animesPopularesSaindo ? (
              <AnimeSliderItems items={animesPopularesSaindo} />
            ) : (
              <div>
                <Spinner />
                <p className="text-xs w-[350px] mt-2">
                  Caso demore para carregar o componente, provavelmente pode ter ocorrido algum interno com um dos servidores, nesse caso reinicie a página.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-10">
          <div>
            <h2 className="text-xl font-bold">ANIMES DA TEMPORADA</h2>
          </div>
          <div className="mt-5 overflow-hidden">
            {animesTemporadaAtual ? (
              <AnimeSliderItems items={animesTemporadaAtual} />
            ) : (
              <div>
                <Spinner />
                <p className="text-xs w-[350px] mt-2">
                  Caso demore para carregar o componente, provavelmente pode ter ocorrido algum interno com um dos servidores, nesse caso reinicie a página.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-20 w-full mx-auto">
          <div className="w-full mx-auto">
            <Image
              className="mx-auto pointer-events-none select-none"
              src="/anya/familia.avif"
              width={300}
              height={300}
              quality={100}
              alt="Anya com sua família"
            />
            <h3 className="font-semibold text-xl w-[480px] max-w-full mx-auto text-center -mt-5">
              Ainda está procurando algo pra assistir? Confira o nosso anime da casa
            </h3>
            <div className="mx-auto text-center mt-6">
              <Link href="/assistir/anime/50265" className="relative border border-blue-500 transition-colors hover:border-blue-600 uppercase font-bold py-2 px-10">
                Ver Anime
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
