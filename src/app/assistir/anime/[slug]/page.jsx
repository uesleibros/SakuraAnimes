import {headers} from "next/headers";
import Image from "next/image";
import AnimeInfos from "@/components/Anime/AnimeInfos";

async function pegarDadosAnime(slug, host, protocol) {
	const query = `
		query($id: Int) {
		  Media(idMal: $id, type: ANIME) {
		    idMal
		    title {
		      romaji
		      english
		      native
		      userPreferred
		    }
		    nextAiringEpisode {
          timeUntilAiring
          airingAt
          episode
        }
        averageScore
        favourites
        popularity
        synonyms
		    type
		    description(asHtml: false)
		    startDate {
		    	year
		    }
		    stats {
          statusDistribution {
            status
            amount
          }
        }
		    status
		    episodes
		    genres
		    coverImage {
          extraLarge
          large
          medium
          color
        }
        bannerImage
		    trailer {
		      id
		      site
		    }
		    studios {
		      edges {
		        node {
		          name
		          siteUrl
		          isAnimationStudio
		        }
		      }
		    }
		    externalLinks {
		      site
		      url
		      icon
		    }
		    recommendations {
		      edges {
		        node {
		          mediaRecommendation {
		            idMal
		            title {
		              romaji
		              english
		              native
		            }
		            duration
		            episodes
		            status
		            coverImage {
		              large
		              medium
		            }
		            trailer {
		              site
		              id
		            }
		          }
		        }
		      }
		    }
		    staff {
		      edges {
		        node {
		          name {
		            first
		            middle
		            last
		            full
		            native
		            userPreferred
		          }
		          siteUrl
		          image {
		            large
		            medium
		          }
		          primaryOccupations
		        }
		      }
		    }
		    characters {
		      edges {
		        voiceActors {
		          siteUrl
		          name {
		            first
		            middle
		            last
		            full
		            native
		            userPreferred
		          }
		          image {
		            large
		            medium
		          }
		        }
		        role
		        node {
		          siteUrl
		          name {
		            first
		            middle
		            last
		            full
		            native
		            userPreferred
		          }
		          image {
		            large
		            medium
		          }
		          description
		        }
		      }
		    }
		  }
		}
	`;
	const variables = {
		id: slug
	};


	const res = await fetch(`${protocol}://${host}/api/query/anilist`, {
		method: "POST",
		body: JSON.stringify({
	    query: query,
	    variables: variables
	  })
	});

	if (res.ok) {
		const {data} = await res.json();
		if (data || data.Media) {
			return data.Media;
		}
	}

	return null;
}

export async function generateMetadata({params}) {
  const {slug} = params;
  
  const headersList = headers();
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const anime = await pegarDadosAnime(slug, headersList.get("host"), protocol);

  if (!anime) {
    return {
      title: "Anime não encontrado",
      description: "O anime que você está procurando não foi encontrado.",
    };
  }


  const cleanedDescription = anime.description.replace(/<[^>]*>/g, ' ');

  return {
    title: `${anime.title.romaji}`,
    description: cleanedDescription,
    openGraph: {
      title: anime.title.romaji,
      description: cleanedDescription,
      images: [{ url: anime.coverImage.large }],
    },
    twitter: {
      card: "summary_large_image",
      title: anime.title.romaji,
      description: cleanedDescription,
      images: [anime.coverImage.large],
    },
  };
}

export default async function VerAnime({params}) {
	const {slug} = params;
	const headersList = headers();
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const anime = await pegarDadosAnime(slug, headersList.get("host"), protocol);

	return (
		<>
			<main>
				{anime ? (
					<>
						<AnimeInfos anime={anime} />
					</>
				) : (
					<div>
						<div className="flex max-[640px]:flex-col gap-4 items-center justify-between sm:px-20 mt-20">
							<Image src="/anya/assustada.png" alt="Anime não encontrado." width={300} height={300} />
							<p className="font-semibold sm:w-[400px] text-center sm:text-right">Não consegui encontrar o anime que você está procurando, minha mãe vai ficar brava comigo.</p>
						</div>
					</div>
				)}
			</main>
		</>
	);
}
