"use client";

import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Input} from "@nextui-org/react";
import {useState} from "react";
import {FaSearch} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
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
						startContent={<FaSearch className="text-zinc-500" />} 
					/>
				</NavbarMenuItem>
			</NavbarMenu>
		</Navbar>
	);
}