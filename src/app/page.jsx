"use client";

import {useEffect, useState, useRef } from "react";
import {Spinner} from "@nextui-org/react";
import {FaCirclePlay} from "react-icons/fa6";
import CustomImage from "@/components/CustomImage";
import Link from "next/link";
import classificacaoIndicativaCor from "@/utils/classificacaoIndicativaCor";
import toSlug from "@/utils/toSlug";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [animesRecentes, setAnimesRecentes] = useState(null);
  const [animesPopulares, setAnimesPopulares] = useState(null);
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

    pegarEpisodiosRecemAdicionados();
    pegarAnimesPopulares();
    return;
  }, []);

  return (
    <main>
      <div className="px-[16px] pb-10 mx-auto max-w-[1240px] w-full mt-10">
        <div className="mb-10">
          <Link href="/assistir/anime/vtuber-nandaga-haishin-kiri-wasuretara-densetsu-ni-natteta">
            <CustomImage
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
                <div className="w-full sm:w-[290px] transition-transform duration-300 hover:scale-105" key={index}>
                  <div className="mb-2">
                    <Link href={`/assistir/anime/${animeRecente.episode.anime.slug_serie}/${animeRecente.episode.generate_id}`}>
                      <div className="relative w-full sm:w-[290px] h-[200px] sm:h-[160.5px]">
                        <CustomImage 
                          className="w-full h-full rounded-lg object-cover" 
                          src={`${animeRecente.episode.thumbnail}`} 
                          width={1200}
                          height={1200}
                          priority={true}
                          quality={100}
                          placeholderImage={`${animeRecente.episode.anime.thumbnail}`}
                          alt={`${animeRecente.episode.anime.titulo}`} 
                        />
                        <div className="absolute top-0 bg-black bg-opacity-30 w-full h-full">
                          <div>
                            <FaCirclePlay size={40} className="text-white mx-auto mt-[22%]" />
                          </div>
                        </div>
                        <div className="absolute w-full top-0 p-2 flex justify-between items-center">
                          { animeRecente.episode.anime.dub > 0 ? (
                            <div className="pointer-events-none bg-opacity-80 font-bold bg-purple-500 w-[max-content] rounded-lg px-2 text-sm">DUB</div>
                          ) : (
                            <div className="pointer-events-none bg-opacity-80 font-bold bg-red-500 w-[max-content] rounded-lg px-2 text-sm">LEG</div>
                          )}
                          <div className="pointer-events-none bg-opacity-80 font-bold bg-zinc-800 w-[max-content] rounded-lg px-2 text-sm">{animeRecente.episode.n_episodio}</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <p className="truncate font-semibold text-[10px] uppercase text-zinc-400 -mt-1 w-full">{animeRecente.episode.anime.titulo}</p>
                </div>
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
          <Link href="/assistir/anime/hazurewaku-no-joutai-ljou-skill-de-saikyou-ni-natta-ore-ga-subete-wo-juurin-suru-made">
            <CustomImage
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
          <div className="mt-5">
            {animesPopulares ? (
              <Slider {...settings} className="w-full h-[380px]">
                {animesPopulares.map((popular, index) => (
                  <Link key={index} href={`/assistir/anime/${popular.mal_id}`} className="w-[240px] h-[max-content] relative group">
                    <div className="w-full h-[323px] relative">
                      <div className="w-full h-full">
                        <CustomImage
                          className="w-full h-full"
                          src={`${popular.images.jpg.large_image_url}`}
                          width={1200}
                          height={1200}
                          quality={100}
                          alt={`${popular.title}`}
                        />
                      </div>
                      <p className="truncate font-semibold text-xs mt-1 w-full opacity-100 group-hover:opacity-0 transition-opacity duration-300">{popular.title}</p>
                    </div>
                    <div className="absolute z-20 top-0 w-full h-full bg-[#141519] bg-opacity-90 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="font-semibold text-xs">{popular.title} <span className="text-[10px]">({popular.title_japanese})</span></p>
                      <p className="font-semibold text-[8px]">{popular.title_english}</p>

                      <div className="mt-3">
                        <p className="font-semibold text-xs text-zinc-400">{popular.duration}</p>
                        <p className="font-semibold text-xs text-zinc-400">{popular.episodes} Episódios</p>
                        <p className="font-semibold text-xs text-zinc-400 mt-3">{popular.airing ? "Não finalizado" : "Finalizado"} ({popular.aired.string})</p>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full">
                        <Link href={`${popular.trailer.url}`}>
                          <p className="text-xs w-full p-2 transition-colors duration-300 bg-orange-500 hover:bg-orange-600 text-center text-black font-bold">
                            Ver Trailer
                          </p>
                        </Link>
                      </div>
                    </div>
                  </Link>
                ))}
              </Slider>
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
            <CustomImage
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
              <Link href="/assistir/anime/spy-x-family" className="relative border border-blue-500 transition-colors hover:border-blue-600 uppercase font-bold py-2 px-10">
                Ver Anime
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
