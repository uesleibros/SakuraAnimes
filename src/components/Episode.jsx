"use client"

import Link from "next/link";
import Image from "next/image";

export default function Episode({ slug, episode_id, thumbnail, title, episode_number, dub }) {
	return (
		<>
		  <div className="w-full sm:w-[290px] transition-transform duration-300 hover:scale-105 group">
		    <div className="mb-2">
		      <Link href={`/assistir/anime/${slug}/${episode_id}`}>
		        <div className="relative w-full sm:w-[290px] h-[200px] sm:h-[160.5px]">
              <Image 
                className="w-full h-full rounded-lg object-cover" 
                src={`${thumbnail}`} 
                width={1200}
                height={1200}
                priority={true}
                quality={100}
                alt={`${title}`} 
              />
              <div className="absolute top-0 transition duration-300 group-hover:bg-black group-hover:bg-opacity-30 w-full h-full">
                <div className="invisible transition duration-300 group-hover:visible">
                  <p className="text-white text-xl text-center mx-auto mt-[22%]">Plau</p>
                </div>
              </div>
		          <div className="absolute w-full top-0 p-2 flex justify-between items-center">
		            {dub > 0 ? (
		              <div className="pointer-events-none bg-opacity-80 font-bold bg-purple-500 w-[max-content] rounded-lg px-2 text-sm">DUB</div>
		            ) : (
		              <div className="pointer-events-none bg-opacity-80 font-bold bg-red-500 w-[max-content] rounded-lg px-2 text-sm">LEG</div>
		            )}
		            <div className="pointer-events-none bg-opacity-80 font-bold bg-zinc-800 w-[max-content] rounded-lg px-2 text-sm">{episode_number}</div>
		          </div>
		        </div>
		      </Link>
		    </div>
		    {title && (
		    	<p className="truncate font-semibold text-[10px] uppercase text-zinc-400 -mt-1 w-full">{title}</p>
		    )}
		  </div>
		</>
	);
}
