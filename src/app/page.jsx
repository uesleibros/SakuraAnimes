"use client";

import {useEffect, useState} from "react";
import {MdNewReleases} from "react-icons/md";
import {FaPlay} from "react-icons/fa6";
import Header from "@/components/Header";
import CustomImage from "@/components/CustomImage";
import Link from "next/link";

export default function Home() {
  const [animesRecentes, setAnimesRecentes] = useState(null);

  useEffect(() => {
    async function pegarEpisodiosRecemAdicionados() {
      const res = await fetch("/api/recentes/animes/anroll");
      const data = await res.json();

      setAnimesRecentes(data.data.data_releases);
    }

    pegarEpisodiosRecemAdicionados();
    return;
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950">
      <Header />
      <div className="px-[4rem] mt-10">
        <div>
          <div className="flex items-center gap-2">
            <MdNewReleases size={25} />
            <h2 className="text-xl font-bold">Últimos Lançamentos</h2>
          </div>
          { animesRecentes ? (
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-10 mt-5">
              {animesRecentes.map((animeRecente, index) => (
                <div className="w-[250px] sm:w-[200px] transition-transform duration-300 hover:-translate-y-2 hover:scale-105" key={index}>
                  <div className="mb-2">
                    <Link href={`/assistir/anime/${animeRecente.episode.anime.slug_serie}/${animeRecente.episode.n_episodio}`}>
                      <div className="relative">
                        <CustomImage 
                          className="rounded-lg w-full h-full" src={`${animeRecente.episode.thumbnail}`} 
                          placeholder="blur"
                          blurDataURL="https://img.freepik.com/vetores-gratis/desfocar-o-fundo-abstrato_1034-249.jpg"
                          width={250}
                          height={200}
                          priority={true}
                          placeholderImage="/capa-ne.jpg"
                          alt={`${animeRecente.episode.anime.titulo}`} 
                        />
                        <div className="absolute w-full top-0 p-2 flex justify-between items-center">
                          { animeRecente.episode.anime.dub > 0 ? (
                            <div className="pointer-events-none bg-purple-500 w-[max-content] rounded-lg px-2 text-sm">DUB</div>
                          ) : (
                            <div className="pointer-events-none bg-red-500 w-[max-content] rounded-lg px-2 text-sm">LEG</div>
                          )}
                          <div className="pointer-events-none bg-zinc-800 w-[max-content] rounded-lg px-2 text-sm">{animeRecente.episode.n_episodio}</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <p className="truncate overflow-hidden text-ellipsis">{animeRecente.episode.anime.titulo}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5">Carregando...</div>
          )}
        </div>
        <div className="mt-10">
          <div className="flex items-center gap-2">
            <FaPlay size={25} />
            <h2 className="text-xl font-bold">Últimos animes adicionados</h2>
          </div>
          <p className="mt-5">em breve (se pá amanhã)</p>
        </div>
      </div>
    </main>
  );
}
