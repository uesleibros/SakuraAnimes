"use client";

import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AnimeSliderItems({ items }) {
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

	return (
		<Slider {...settings} className="w-full h-full">
			{items.map((item, index) => (
			  <Link key={index} href={`/assistir/anime/${item.mal_id}`} className="!w-[200px] h-[max-content] relative group">
			    <div className="w-full h-[323px] relative">
			      <div className="w-full h-full">
			        <Image
			          className="w-full h-full"
			          src={`${item.images.jpg.large_image_url}`}
			          width={1200}
			          height={1200}
			          quality={100}
			          alt={`${item.title}`}
			        />
			      </div>
			      <p className="truncate font-semibold text-xs mt-1 w-full opacity-100 group-hover:opacity-0 transition-opacity duration-300">{item.title}</p>
			    </div>
			    <div className="absolute z-20 top-0 w-full h-full bg-[#141519] bg-opacity-90 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
			      <p className="font-semibold text-xs">{item.title} <span className="text-[10px]">({item.title_japanese})</span></p>
			      <p className="font-semibold text-[8px]">{item.title_english}</p>

			      <div className="mt-3">
			        <p className="font-semibold text-xs text-zinc-400">{item.episodes ? item.episodes : '?'} Episódios</p>
			        <p className="font-semibold text-xs text-zinc-400 mt-3">{item.airing ? "Não finalizado" : "Finalizado"}</p>
			      </div>
			      {item.trailer.url && (
			        <div className="absolute bottom-0 left-0 w-full">
			          <Link href={`${item.trailer.url}`}>
			            <p className="text-xs w-full p-2 transition-colors duration-300 bg-orange-500 hover:bg-orange-600 text-center text-black font-bold">
			              Ver Trailer
			            </p>
			          </Link>
			        </div>
			      )}
			    </div>
			  </Link>
			))}
		</Slider>
	);
}
