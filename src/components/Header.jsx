"use client";

import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Input} from "@nextui-org/react";
import {Spinner} from "@nextui-org/react";
import {useState, useEffect} from "react";
import {FaSearch} from "react-icons/fa";
import {FaPlay} from "react-icons/fa6";
import Image from "next/image";
import CustomImage from "@/components/CustomImage";
import Link from "next/link";
import classificacaoIndicativaCor from "@/utils/classificacaoIndicativaCor";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [value, setValue] = useState("");
	const [listaAnimes, setListaAnimes] = useState(null);

	function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
	}

	function handleChangeValue(e) {
    const value = e.target.value.trim();
    if (value.length > 3) {
      debounceFetchAnimes(value);
    } else {
    setListaAnimes(null);
    }
  }

const debounceFetchAnimes = debounce(async (query) => {
  setListaAnimes(null);
  const res = await fetch(`/api/buscar/animes/anroll?q=${query}`);
  const data = await res.json();

  if (!res.ok) {
    setListaAnimes(null);
    return;
  }

  setListaAnimes(data);
}, 300);
	
	return (
		<div className="relative">
			<Navbar className="bg-zinc-800" isBlurred={false} isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
				<NavbarContent className="sm:hidden" justify="start">
	        <NavbarMenuToggle />
	      </NavbarContent>

				<NavbarContent className="sm:hidden pr-3" justify="center">
					<NavbarBrand>
						<Link href="/">
							<div className="flex items-center gap-1">
								<Image src="/logo.png" width={20} height={20} alt="Sakura Animes" />
								<h3 className="text-pink-500 font-bold">Sakura Animes</h3>
							</div>
						</Link>
					</NavbarBrand>
				</NavbarContent>
				<NavbarContent className="hidden sm:flex gap-4" justify="center">
					<NavbarBrand>
						<Link href="/">
							<div className="flex items-center gap-1">
								<Image src="/logo.png" width={20} height={20} alt="Sakura Animes" />
								<h3 className="text-pink-500 font-bold">Sakura Animes</h3>
							</div>
						</Link>
					</NavbarBrand>
					<NavbarItem className="ml-5">
						<Input 
							type="text" 
							size="sm" 
							color="default" 
							placeholder="Digite sua obra..." 
							variant="underlined"
							isClearable={true}
							onChange={handleChangeValue}
							value={value}
							onValueChange={setValue}
							startContent={<FaSearch className="text-zinc-500" />} 
						/>
					</NavbarItem>
				</NavbarContent>
				<NavbarMenu>
					<NavbarMenuItem>
						<Input 
							type="text" 
							size="sm" 
							color="default" 
							placeholder="Digite sua obra..." 
							variant="underlined"
							isClearable={true}
							onChange={handleChangeValue}
							value={value}
							onValueChange={setValue}
							startContent={<FaSearch className="text-zinc-500" />} 
						/>
					</NavbarMenuItem>
					<NavbarMenuItem>
						{value.length > 3 && (
							<div className="max-h-[24rem] overflow-y-scroll rounded-b shadow-sm">
								{listaAnimes ? (
									<div className="w-full grid grid-cols-1 gap-5">
										{listaAnimes.data.map((anime, index) => (
											<Link href={`/assistir/anime/${anime.slug}`} className="w-full max-w-full transition-colors transition-transform hover:translate-x-4 hover:bg-zinc-700 bg-zinc-800 rounded-lg shadow-sm p-2" key={index}>
												<div className="flex gap-2">
													<CustomImage 
														className="rounded" 
														src={`${anime.thumbnail}`} 
														placeholderImage="/capa-ne.jpg"
														alt={`${anime.title}`} 
														height={100} 
														width={50} 
														quality={100} />
													<div className="max-w-[70%]">
														<p className="text-sm">{anime.title}</p>
														<p className="text-gray-400 truncate text-sm w-full">{anime.synopsis}</p>
														<div className="mt-3 flex items-center gap-2">
															<div className="pointer-events-none bg-opacity-80 font-bold bg-blue-600 w-[max-content] rounded-lg px-2 py-1 text-xs">{anime.type === "anime" ? "Anime" : "Filme"}</div>
															{anime.type === "anime" && (
																<div className="pointer-events-none bg-opacity-80 font-bold bg-black w-[max-content] rounded-lg px-2 py-1 text-xs flex items-center gap-2"><FaPlay /> {anime.total_eps}</div>
															)}
															<div className={`pointer-events-none bg-opacity-80 font-bold ${classificacaoIndicativaCor(anime.censorship)} w-[max-content] rounded-lg px-2 py-1 text-xs`}>{anime.censorship == "0" ? "Livre" : "PG-" + anime.censorship}</div>
														</div>
													</div>
												</div>
											</Link>
										))}
									</div>
								) : (
									<div className="p-5 mx-auto">
										<Spinner />
									</div>
								)}
							</div>
						)}
					</NavbarMenuItem>
				</NavbarMenu>
			</Navbar>
			{value.length > 3 && (
				<div className="invisible transition ease-in-out delay-150 sm:visible absolute z-50 w-[800px] max-w-[800px] left-[20%] min-h-[10.32rem] max-h-[30rem] overflow-y-scroll bg-zinc-900 rounded-b shadow-sm">
					{listaAnimes ? (
						<div className="w-full grid grid-cols-1 gap-5 p-5">
							{listaAnimes.data.map((anime, index) => (
								<Link href={`/assistir/anime/${anime.slug}`} className="w-full max-w-full transition-colors transition-transform hover:translate-x-4 hover:bg-zinc-700 bg-zinc-800 rounded-lg shadow-sm p-2" key={index}>
									<div className="flex gap-2">
										<CustomImage 
											className="rounded" 
											src={`${anime.thumbnail}`} 
											placeholderImage="/capa-ne.jpg"
											alt={`${anime.title}`} 
											height={100} 
											width={50} 
											quality={100} />
										<div className="max-w-[90%]">
											<p className="text-sm">{anime.title}</p>
											<p className="text-gray-400 truncate text-sm w-full">{anime.synopsis}</p>
											<div className="mt-3 flex items-center gap-2">
												<div className="pointer-events-none bg-opacity-80 font-bold bg-blue-600 w-[max-content] rounded-lg px-2 py-1 text-xs">{anime.type === "anime" ? "Anime" : "Filme"}</div>
												{anime.type === "anime" && (
													<div className="pointer-events-none bg-opacity-80 font-bold bg-black w-[max-content] rounded-lg px-2 py-1 text-xs flex items-center gap-2"><FaPlay /> {anime.total_eps}</div>
												)}
												<div className={`pointer-events-none bg-opacity-80 font-bold ${classificacaoIndicativaCor(anime.censorship)} w-[max-content] rounded-lg px-2 py-1 text-xs`}>{anime.censorship == "0" ? "Livre" : "PG-" + anime.censorship}</div>
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
					) : (
						<div className="p-5 mx-auto">
							<Spinner />
						</div>
					)}
				</div>
			)}
		</div>
	);
}
