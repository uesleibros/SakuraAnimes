export async function GET(request) {
	const id = request.nextUrl.searchParams.get("id");

	if (!id)
		return Response.json({ error: "missing id." }, { status: 401 });

	const res = await fetch(`https://apiv3-prd.anroll.net/animes/${id}/episodes?page=1&order=asc`, {
		cache: "no-store"
	});

	const { data } = await res.json();
	data.forEach((i) => i.thumbnail = `https://static.anroll.net/images/animes/screens/${i.anime.slug_serie}/${i.n_episodio}.jpg`);
	data.forEach((i) => i.anime.thumbnail = `https://static.anroll.net/images/animes/screens/${i.anime.slug_serie}/${i.n_episodio}.jpg`);

	return Response.json({ data });
}