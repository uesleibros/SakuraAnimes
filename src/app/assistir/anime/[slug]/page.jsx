import AnrollAnimeInfos from "@/components/Anime/AnrollAnimeInfos";
import Image from "next/image";

async function pegarDadosAnime(slug) {
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
		    type
		    description(asHtml: false)
		    seasonYear
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

	const res = await fetch(`http://localhost:3000/api/query/anilist`, {
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

export async function generateMetadata({ params }) {
  const {slug} = params;
  
  const anime = await pegarDadosAnime(slug);

  if (!anime) {
    return {
      title: 'Anime não encontrado',
      description: 'O anime que você está procurando não foi encontrado.',
    };
  }

  const cleanedDescription = anime.description.replace(/<br\s*\/?>/gi, ' ');

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
	let anime = await pegarDadosAnime(slug);

	return (
		<>
			<main className="min-h-screen">
				<div className="mt-20 pb-20 px-[16px] mx-auto max-w-[1240px] w-full">
					{anime ? (
						<div>
							<div className="absolute left-0 top-0 z-0 w-full inset-0 h-[400px]">
								<Image
									className="w-full h-full object-cover blur brightness-50"
									src={`${anime.bannerImage}`}
									width={1200}
									height={1200}
									quality={100}
								  alt={`${anime.title.romaji}`}
								/>
							</div>
							<div className="flex relative z-10 flex-col gap-4">
								<div className="max-w-[224.45px] max-h-[323.28px]">
									<Image
										className="rounded w-full h-[323.28px] shadowm-sm"
										src={`${anime.coverImage.large}`}
										width={1200}
										height={1200}
										quality={100}
										alt={`${anime.title.romaji}`}
									/>
								</div>
								<div>
									<div className="flex max-[640px]:flex-col sm:items-center gap-2">
										<div>
											<h2 className="font-bold text-3xl">{anime.title.romaji}</h2>
										</div>
										<div className="text-xs">
											<p className="font-bold select-none">({anime.seasonYear ? anime.seasonYear : "Não lançado"})</p>
										</div>
									</div>
									<div className="mt-3 flex items-center gap-2">
										<p className="text-sm w-full">{anime.description.replace(/<br\s*\/?>/gi, ' ')}</p>
									</div>
								</div>
							</div>
							<AnrollAnimeInfos anime={anime} />
						</div>
					) : (
						<div>
							<Spinner />
							<p className="text-xs w-[350px] mt-2">
								Caso demore para carregar o componente, provavelmente o conteúdo que você está tentando acessar não existe.
							</p>
						</div>
					)}
				</div>
			</main>
		</>
	);
}
