export async function GET(request) {
	const id = request.nextUrl.searchParams.get("id");
	const page = request.nextUrl.searchParams.get("page");

	if (!id && !page)
		return Response.json({ error: "missing id or page." }, { status: 404 });

	const res = await fetch(`https://apiv3-prd.anroll.net/animes/${id}/episodes?page=${page}&order=asc`, {
		cache: "no-store"
	});

	const data = await res.json();
	data.data.forEach((i) => i.thumbnail = `https://static.anroll.net/images/animes/screens/${i.anime.slug_serie}/${i.n_episodio}.jpg`);
	data.data.forEach((i) => i.anime.thumbnail = `https://static.anroll.net/images/animes/capas/${i.anime.slug_serie}.jpg`);
	data.data.forEach((i) => i.page = page);

	return Response.json(data);
}