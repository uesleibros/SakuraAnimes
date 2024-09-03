import {headers} from "next/headers";
import Episode from "@/components/Episode";
import AnimeSliderItems from "@/components/AniList/AnimeSliderItems";
import getSeason from "@/utils/getSeason";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const headersList = headers();
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const host = headersList.get("host");

  async function pegarTopicosAnimes() {
    const query = `
      query ($season: MediaSeason, $seasonYear: Int) {
        trending: Page(page: 1, perPage: 12) {
          media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
            ...media
          }
        }
        season: Page(page: 1, perPage: 12) {
          media(season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
            ...media
          }
        }
        popular: Page(page: 1, perPage: 12) {
          media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
            ...media
          }
        }
      }

      fragment media on Media {
        idMal
        title {
          romaji
          native
          english
          userPreferred
        }
        coverImage {
          extraLarge
          large
          color
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        bannerImage
        season
        seasonYear
        description
        type
        format
        status(version: 2)
        episodes
        duration
        chapters
        volumes
        genres
        isAdult
        averageScore
        popularity
        mediaListEntry {
          id
          status
        }
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
        studios(isMain: true) {
          edges {
            isMain
            node {
              id
              name
            }
          }
        }
      }
    `;
    const variables = {
      "type": "ANIME",
      "season": getSeason(),
      "seasonYear": new Date().getFullYear()
    }

    const res = await fetch(`${protocol}://${host}/api/query/anilist`, {
      method: "POST",
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    });

    if (res.ok) {
      const {data} = await res.json();
      if (data) {
        return data;
      }
    }

    return null;
  }

  async function pegarAnimesRecentes() {
    const res = await fetch(`${protocol}://${host}/api/recentes/animes/anroll`);
    const {data} = await res.json();

    return data;
  }

  const trending = await pegarTopicosAnimes();
  const animesRecentes = await pegarAnimesRecentes();

  return (
    <main>
      <div className="px-[16px] pb-10 mx-auto max-w-[1240px] w-full mt-10">
        <div className="mb-10">
          <Link href="/assistir/anime/54284">
            <Image
              className="max-[640px]:h-[160px]"
              src="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=2700/cr/desktop_large/31752e60-b3f4-415b-95a4-496903d66a68.png"
              width={1200}
              height={1200}
              quality={100}
              alt="Popular"
            />
          </Link>
        </div>
        <div>
          <div>
            <h2 className="text-xl font-bold">ÚLTIMOS LANÇAMENTOS</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 mt-5">
            {animesRecentes.map((animeRecente, index) => (
              <Episode slug={animeRecente.episode.anime.slug_serie} episode_id={animeRecente.episode.generate_id} episode_number={animeRecente.episode.n_episodio} dub={animeRecente.episode.dub} thumbnail={animeRecente.episode.thumbnail} title={animeRecente.episode.anime.titulo} key={index} />
            ))}
          </div>
        </div>
        <div className="mt-10">
          <Link href="/assistir/anime/57892">
            <Image
              className="max-[640px]:h-[160px]"
              src="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=2700/cr/desktop_large/30033c32-049b-4618-8dcd-0a27d0601135.png"
              width={1200}
              height={1200}
              quality={100}
              alt="Popular"
            />
          </Link>
        </div>
        <div className="mt-10">
          <div>
            <h2 className="text-xl font-bold">MAIS POPULARES</h2>
          </div>
          <div className="mt-5">
            <AnimeSliderItems items={trending.trending} node='' dadNode="media" />
          </div>
        </div>
        <div className="mt-10">
          <div>
            <h2 className="text-xl font-bold">MAIS POPULARES DE TODOS OS TEMPOS</h2>
          </div>
          <div className="mt-5">
            <AnimeSliderItems items={trending.popular} node='' dadNode="media" />
          </div>
        </div>
        <div className="mt-10">
          <div>
            <h2 className="text-xl font-bold">MAIS POPULARES DA TEMPORADA</h2>
          </div>
          <div className="mt-5">
            <AnimeSliderItems items={trending.season} node='' dadNode="media" />
          </div>
        </div>
        <div className="mt-20 w-full mx-auto">
          <div className="w-full mx-auto">
            <Image
              className="mx-auto pointer-events-none select-none"
              src="/anya/familia.avif"
              width={300}
              height={300}
              quality={100}
              alt="Anya com sua família"
            />
            <h3 className="font-semibold text-xl w-[480px] max-w-full mx-auto text-center -mt-5">
              Ainda está procurando algo pra assistir? Confira o nosso anime da casa
            </h3>
            <div className="mx-auto text-center mt-6">
              <Link href="/assistir/anime/50265" className="relative border border-blue-500 transition-colors hover:border-blue-600 uppercase font-bold py-2 px-10">
                Ver Anime
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
