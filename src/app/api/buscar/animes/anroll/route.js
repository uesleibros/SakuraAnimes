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
	let query = request.nextUrl.searchParams.get("q");

	if (!query)
		return Response.json({ error: "missing query." }, { status: 401 });

	query = query.replace('×', 'x').replace(':', '').toLowerCase();
	const res = await fetch(`https://api-search.anroll.net/data?q=${query}`, {
		cache: "no-store"
	});

	let {data} = await res.json();
	let responses = []

	if (!data.length)
		return Response.json({ error: "anime not found." }, { status: 404 });

	if (data.length > 1) {
		for (let i = 0; i < data.length; i++) {
			let item = data[i];
			item.title = item.title.replace('×', 'x').replace(':', '').toLowerCase();

			if (item.title.startsWith(query))
				responses.push(item);
			if (item.title.split(' ')[0].includes(query.split(' ')[0]))
				responses.push(item);
			if (item.slug == toSlug(query))
				responses.push(item);
		}
		data = responses;
	}

	data.forEach((i) => i.thumbnail = `https://static.anroll.net/images/${i.type === "movie" ? "filmes" : "animes"}/capas/${i.slug}.jpg`);
	for (let i = 0; i < data.length; i++) {
		data[i].extra_data = await pegarInformacoesDetalhadasAnime(data[i]);
	}

	return Response.json({ data });
}
