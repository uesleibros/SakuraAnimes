import extractData from "@/utils/anroll/extractData";

export async function GET() {
	const res = await fetch("https://www.anroll.net", {
		headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
			"Referer": "https://www.anroll.net/"
		},
		next: { revalidate: 300 }
	});

	const data = extractData(await res.text());
	const catalog = JSON.parse(data)?.props;
	catalog.pageProps.data.data_releases.forEach((i) => i.episode.thumbnail = `https://static.anroll.net/images/animes/screens/${i.episode.anime.slug_serie}/${i.episode.n_episodio}.jpg`);
	catalog.pageProps.data.data_releases.forEach((i) => i.episode.anime.thumbnail = `https://static.anroll.net/images/animes/capas/${i.episode.anime.slug_serie}.jpg`);

	return Response.json(catalog.pageProps);
}
