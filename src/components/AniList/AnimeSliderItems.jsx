"use client";

import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AnimeSliderItems({ items, node }) {
	const settings = {
	  infinite: false,
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

	function getNestedValue(obj, path) {
	  if (!obj || !path) return undefined;

	  const pathArray = path.split('.');
	  return pathArray.reduce((acc, key) => acc && acc[key], obj);
	}

	return (
		<Slider {...settings} className="w-full h-[340px]">
			{items.map((item, index) => (
			  <Link key={index} href={`/assistir/anime/${getNestedValue(item, node).idMal}`} className="!w-[220px] h-[max-content] relative group">
			    <div className="w-full h-[323px] relative">
			      <div className="w-full h-full">
			        <Image
			          className="w-full h-full"
			          src={`${getNestedValue(item, node).coverImage.large}`}
			          width={1200}
			          height={1200}
			          quality={100}
			          alt={`${getNestedValue(item, node).title.romaji}`}
			        />
			      </div>
			      <p className="truncate font-semibold text-xs mt-1 w-full opacity-100 group-hover:opacity-0 transition-opacity duration-300">{getNestedValue(item, node).title.romaji}</p>
			    </div>
			    <div className="absolute z-20 top-0 w-full h-full bg-[#141519] bg-opacity-90 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
			      <p className="font-semibold text-xs">{getNestedValue(item, node).title.romaji} <span className="text-[10px]">({getNestedValue(item, node).title.native})</span></p>
			      <p className="font-semibold text-[8px]">{getNestedValue(item, node).title.english}</p>

			      <div className="mt-3">
			        <p className="font-semibold text-xs text-zinc-400">{getNestedValue(item, node).episodes ? getNestedValue(item, node).episodes : '?'} Episódios</p>
			        <p className="font-semibold text-xs text-zinc-400 mt-3">{getNestedValue(item, node).status ? "FINISHED" : "Finalizado"}</p>
			      </div>
			      {getNestedValue(item, node).trailer && (
			        <div className="absolute bottom-0 left-0 w-full">
			          <Link href={`https://${getNestedValue(item, node).trailer.site}/watch?v=${getNestedValue(item, node).trailer.id}`}>
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
