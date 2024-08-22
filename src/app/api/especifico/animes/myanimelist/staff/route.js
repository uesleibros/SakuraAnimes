export async function GET(request) {
	const id = request.nextUrl.searchParams.get("id");

	if (!id)
		return Response.json({ error: "missing id." }, { status: 401 });

	const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/staff`, {
		cache: "no-store"
	});

	const {data} = await res.json();

	if (Object.keys(data).length === 0)
		return Response.json({ error: "anime not found." }, { status: 404 });

	return Response.json({ data });
}