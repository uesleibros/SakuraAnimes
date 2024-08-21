"use client";

import {Divider} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 bg-[linear-gradient(180deg,#0000,#213944)] mt-20 p-10 sm:px-40 sm:pt-40 flex flex-col gap-10">
      <div>
        <div>
          <p className="text-[9px] font-semibold text-zinc-500 w-[600px] max-w-full mb-1">Sem esses servidores, nosso projeto nunca seria possível.</p>
        </div>
        <h3 className="font-bold text-md -mb-10">Servidores utilizados</h3>
      </div>
      <div className="flex items-center gap-5">
        <Link href="https://myanimelist.net/">
          <Image
            src="/sites/myanimelist.png"
            width={50}
            height={50}
            quality={100}
            alt="MyAnimeList"
          />
        </Link>
        <Link href="https://anroll.net/">
          <Image
            className="filter brightness-0 invert"
            src="/sites/anroll.png"
            width={100}
            height={100}
            quality={100}
            alt="AnROLL"
          />
        </Link>
        <Link href="https://crunchyroll.com/pt-BR">
          <Image
            className="filter brightness-0 invert"
            src="/sites/crunchyroll.png"
            width={100}
            height={100}
            quality={100}
            alt="Crunchyroll"
          />
        </Link>
        <Link href="https://animefire.plus/">
          <Image
            className="filter brightness-0 invert"
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
          © Velvet — Sem fins lucrativos. 
        </p>
        <p className="text-xs font-semibold text-zinc-500 w-[600px] max-w-full mt-1">Somos uma plataforma que visa reunir todos os melhores servidores de animes em um só lugar.</p>
      </div>
    </footer>
  );
}
