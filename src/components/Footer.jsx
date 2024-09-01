"use client";

import {useEffect, useState} from "react";
import {Divider} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const version = "v1.2.5";
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("https://cmp.inmobi.com/geoip");
        if (!response.ok) {
          throw new Error('Erro ao buscar a localização');
        }
        const data = await response.json();
        setLocation(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);
  return (
    <footer className="bg-zinc-950 bg-[linear-gradient(180deg,#0000,#213944)] mt-20 p-10 sm:px-40 sm:pt-40 flex flex-col gap-10">
      <div>
        <div>
          <p className="text-[9px] font-semibold text-zinc-500 w-[600px] max-w-full mb-1">Sem esses servidores, nosso projeto nunca seria possível.</p>
        </div>
        <h3 className="font-bold text-md -mb-10">Servidores utilizados</h3>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <Link href="https://myanimelist.net/">
          <Image
            src="/sites/myanimelist.png"
            width={50}
            height={50}
            quality={100}
            alt="MyAnimeList"
          />
        </Link>
        <Link href="https://anilist.co/">
          <Image
            className="filter brightness-0 invert transition duration-300 hover:filter-none"
            src="/sites/anilist.svg"
            width={35}
            height={35}
            quality={100}
            alt="AniList"
          />
        </Link>
        <Link href="https://anroll.net/">
          <Image
            className="filter brightness-0 invert transition duration-300 hover:filter-none"
            src="/sites/anroll.png"
            width={100}
            height={100}
            quality={100}
            alt="AnROLL"
          />
        </Link>
        <Link href="https://crunchyroll.com/pt-BR">
          <Image
            className="filter brightness-0 invert transition duration-300 hover:filter-none"
            src="/sites/crunchyroll.png"
            width={100}
            height={100}
            quality={100}
            alt="Crunchyroll"
          />
        </Link>
        <Link href="https://animefire.plus/">
          <Image
            className="filter brightness-0 invert transition duration-300 hover:filter-none"
            src="/sites/animefire.webp"
            width={100}
            height={100}
            quality={100}
            alt="AnimeFire"
          />
        </Link>
      </div>
      <Divider />
      <div>
        <p className="text-sm font-semibold flex flex-col">
          <Link className="transition-colors w-[max-content] hover:text-zinc-300 text-[9px]" href="https://github.com/uesleibros/velvet">GitHub</Link>
          © Velvet ({ version }): Sem fins lucrativos. 
        </p>
        <p className="text-xs font-semibold text-zinc-500 max-w-full mt-1">Somos uma entidade que reúne os servidores de animes mais seletos em um só lugar. O que você encontra aqui não nos pertence, apenas mostramos o caminho. Não hospedamos nada que possa ser considerado ilegal; apenas apontamos para onde olhar. Aqueles que ousam acessar arquivos protegidos por leis o fazem por sua conta e risco. A responsabilidade é inteiramente sua. Nenhum de nós se compromete com o que você faz ou deixa de fazer. Cuidado, pois o que encontrar aqui é só o começo.</p>
        {location && (
          <div>
            <p className="text-xs font-semibold">Sua cidade: {location.city}</p>
            <p className="text-xs font-semibold">Seu estado: {location.region}</p>
          </div>
        )}
      </div>
    </footer>
  );
}
