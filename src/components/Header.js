import Image from "next/image";
import { FaSearch } from "react-icons/fa";

export default function Header() {
	return (
		<header className="relative z-10 h-[3.75rem] px-[4rem] flex justify-between items-center bg-[#23252b]">
			<div className="flex items-center gap-1">
				<Image src="/logo.png" width={20} height={20} alt="Sakura Animes" />
				<h3 className="text-pink-500 font-bold">Sakura Animes</h3>
			</div>
			<div className="flex items-center gap-5">
				<div className="relative bg-black bg-opacity-25 transition-colors duration-300 hover:bg-opacity-50 rounded-full h-[40px] w-[40px] flex align-center justify-center">
					<FaSearch className="my-auto" />
				</div>
				<Image className="rounded-full" src="https://i.pinimg.com/736x/77/ab/67/77ab67c40fb6623b784cc6c6381cdd27.jpg" width={40} height={40} quality={100} alt="Perfil" />
			</div>
		</header>
	);
}