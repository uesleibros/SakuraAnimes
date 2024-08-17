import extractData from "@/utils/anroll/extractData";

export async function GET(request) {
	const res = await fetch("https://www.anroll.net", {
		headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
			"Referer": "https://www.anroll.net/"
		},
		cache: "no-store"
	});

	const data = extractData(await res.text());
	const catalog = JSON.parse(data)?.props;
	catalog.pageProps.data.data_releases.forEach((i) => i.episode.thumbnail = `https://static.anroll.net/images/animes/screens/${i.episode.anime.slug_serie}/${i.episode.n_episodio}.jpg`)

	return Response.json(catalog.pageProps);
}