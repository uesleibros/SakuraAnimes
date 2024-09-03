import config from "@/config";

export async function GET() {
	const res = await fetch(`https://www.anroll.net/_next/data/${config.anroll.buildId}/index.json`, {
		headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
			"Referer": "https://www.anroll.net/"
		},
		next: { revalidate: 300 }
	});

	const data = await res.json();
	const catalog = data?.pageProps.data.data_releases;
	catalog.forEach((i) => i.episode.thumbnail = `https://static.anroll.net/images/animes/screens/${i.episode.anime.slug_serie}/${i.episode.n_episodio}.jpg`);
	catalog.forEach((i) => i.episode.anime.thumbnail = `https://static.anroll.net/images/animes/capas/${i.episode.anime.slug_serie}.jpg`);

	return Response.json(catalog);
}
