"use client";

import {useRouter} from "next/navigation";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Input, Spinner} from "@nextui-org/react";
import {useState, useEffect, useCallback} from "react";
import {FaSearch, FaPlay} from "react-icons/fa";
import Image from "next/image";
import CustomImage from "@/components/CustomImage";
import Link from "next/link";
import { RiDiceLine } from "react-icons/ri";
import classificacaoIndicativaCor from "@/utils/classificacaoIndicativaCor";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [value, setValue] = useState("");
  const [listaAnimes, setListaAnimes] = useState(null);
  const router = useRouter();

  async function irParaAnimeAleatorio() {
    const res = await fetch("/api/aleatorio/anime/anroll");
    const {data} = await res.json();

    router.push(`/assistir/anime/${data.slug_serie}`);
    setIsMenuOpen(false);
  }

  const debounce = useCallback((fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }, []);

  const debounceFetchAnimes = useCallback(debounce(async (query) => {
    setListaAnimes(null);
    const res = await fetch(`/api/buscar/animes/anroll?q=${query.trim()}`);
    const data = await res.json();

    if (!res.ok) {
      setListaAnimes(null);
      return;
    }

    setListaAnimes(data);
  }, 400), [debounce]);

  const handleChangeValue = (e) => {
    const query = e.target.value;
    setValue(query);
    if (query.length > 3) {
      debounceFetchAnimes(query);
    } else {
      setListaAnimes(null);
    }
  };

  function handleAnimeClick() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <Navbar position="sticky" className="z-[9999] bg-zinc-800" isBlurred={false} isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <Link href="/">
              <div className="flex items-center gap-1">
                <Image src="/logo.png" width={30} height={30} alt="Velvet" />
                <h3 className="text-blue-500 font-bold">velvet</h3>
              </div>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <Link href="/">
              <div className="flex items-center gap-1 group relative">
                <Image className="filter group-hover:brightness-0 group-hover:invert" src="/logo.png" width={30} height={30} alt="Velvet" />
                <h3 className="text-blue-500 group-hover:text-white font-bold">velvet</h3>
              </div>
            </Link>
          </NavbarBrand>
          <NavbarItem className="ml-5">
            <Input
              autoComplete="off"
              className="w-[300px]"
              type="text"
              size="sm"
              color="default"
              placeholder="Pesquise seu anime..."
              variant="underlined"
              onChange={handleChangeValue}
              value={value}
              startContent={<FaSearch className="text-zinc-500" />}
            />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <NavbarItem>
            <div>
              <RiDiceLine onClick={irParaAnimeAleatorio} className="transition-colors cursor-pointer text-zinc-400 hover:text-white" size={30} />
            </div>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          <NavbarMenuItem>
            <NavbarItem className="mb-3">
              <div onClick={irParaAnimeAleatorio} className="cursor-pointer group flex items-center gap-2">
                <RiDiceLine className="transition-colors text-zinc-400 group-hover:text-white" size={30} />
                <p className="transition-colors text-zinc-400 group-hover:text-white">Anime aleatório</p>
              </div>
            </NavbarItem>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Input
              type="text"
              size="sm"
              color="default"
              placeholder="Pesquise seu anime..."
              variant="underlined"
              onChange={handleChangeValue}
              value={value}
              startContent={<FaSearch className="text-zinc-500" />}
            />
          </NavbarMenuItem>
          <NavbarMenuItem>
            {(value.length > 3 && isMenuOpen) && (
              <div className="z-[9999] pb-20">
                <AnimeList listaAnimes={listaAnimes} onAnimeClick={handleAnimeClick} />
              </div>
            )}
          </NavbarMenuItem>
        </NavbarMenu>
        {value.length > 3 && (
          <div className="invisible transition ease-in-out delay-150 bottom-[-480px] sm:visible absolute z-[9999] w-[800px] max-w-[800px] max-[640px]:w-0 max-[640px]:max-w-0 left-[13rem] min-h-[30rem] max-h-[30rem] overflow-y-scroll bg-zinc-900 rounded-b shadow-sm">
            <AnimeList listaAnimes={listaAnimes} onAnimeClick={handleAnimeClick} />
          </div>
        )}
      </Navbar>
    </>
  );
}

const AnimeList = ({ listaAnimes, onAnimeClick }) => {
  if (!listaAnimes) {
    return (
      <div className="p-5 mx-auto">
        <Spinner />
        <p className="text-xs w-[350px] mt-2">
          Caso demore para carregar o componente, provavelmente a obra que você está buscando não existe.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 gap-5 p-5">
      {listaAnimes.data.map((anime, index) => (
        <Link href={`/assistir/anime/${anime.slug}`} className="w-full max-w-full transition-colors transition-transform hover:translate-x-4 hover:bg-zinc-700 bg-zinc-800 rounded-lg shadow-sm p-2" key={index} onClick={onAnimeClick}>
          <div className="flex gap-2">
            <CustomImage
              className="rounded"
              src={`${anime.thumbnail}`}
              placeholderImage="/capa-ne.jpg"
              alt={`${anime.title}`}
              height={100}
              width={50}
              quality={100}
            />
            <div className="max-w-[70%]">
              <p className="text-sm">{anime.title}</p>
              <p className="text-gray-400 truncate text-sm w-full">{anime.synopsis}</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="pointer-events-none bg-opacity-80 font-bold bg-blue-600 w-[max-content] rounded-lg px-2 py-1 text-xs">
                  {anime.type === "anime" ? "Anime" : "Filme"}
                </div>
                {anime.type === "anime" && (
                  <div className="pointer-events-none bg-opacity-80 font-bold bg-black w-[max-content] rounded-lg px-2 py-1 text-xs flex items-center gap-2">
                    <FaPlay /> {anime.total_eps}
                  </div>
                )}
                <div className={`pointer-events-none bg-opacity-80 font-bold ${classificacaoIndicativaCor(anime.censorship)} w-[max-content] rounded-lg px-2 py-1 text-xs`}>
                  {anime.censorship == "0" ? "Livre" : "PG-" + anime.censorship}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
