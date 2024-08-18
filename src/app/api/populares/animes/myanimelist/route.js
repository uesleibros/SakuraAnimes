async function pegarAnrollAnimeURL(titulo) {
	const res = await fetch(`https://api-search.anroll.net/data?q=${titulo}`, {
		cache: "no-store"
	});

	const {data} = await res.json();

	if (!data.length)
		return '';

	return data[0].slug;
}

export async function GET(request) {
	const res = await fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity");
	const {data} = await res.json();

	for (let i = 0; i < data.length; i++) {
		data[i].anrollURL = await pegarAnrollAnimeURL(data[i].title);
	}

	return Response.json({ data });
}