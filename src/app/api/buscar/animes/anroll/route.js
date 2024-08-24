import extractData from "@/utils/anroll/extractData";
import toSlug from "@/utils/toSlug";

async function pegarInformacoesDetalhadasAnime(data) {
	const res = await fetch(`https://www.anroll.net${data.generic_path}`, {
		headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
			"Referer": "https://www.anroll.net/"
		},
		cache: "no-store"
	});

	const extraData = extractData(await res.text());
	const catalog = JSON.parse(extraData)?.props;

	return catalog.pageProps.data;
}

export async function GET(request) {
	const query = request.nextUrl.searchParams.get("q");

	if (!query)
		return Response.json({ error: "missing query." }, { status: 401 });

	const res = await fetch(`https://api-search.anroll.net/data?q=${query}`, {
		cache: "no-store"
	});

	let {data} = await res.json();

	if (!data.length)
		return Response.json({ error: "anime not found." }, { status: 404 });

	data = data.filter(i => i.title.toLowerCase().startsWith(query.toLowerCase()) || i.slug.startsWith(toSlug(query.toLowerCase())));
	
	data.forEach((i) => i.thumbnail = `https://static.anroll.net/images/${i.type === "movie" ? "filmes" : "animes"}/capas/${i.slug}.jpg`);
	for (let i = 0; i < data.length; i++) {
		data[i].extra_data = await pegarInformacoesDetalhadasAnime(data[i]);
	}

	return Response.json({ data });
}
