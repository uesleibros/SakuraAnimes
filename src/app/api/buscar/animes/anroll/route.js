export async function GET(request) {
	const query = request.nextUrl.searchParams.get("q");

	if (!query)
		return Response.json({ error: "missing query." }, { status: 401 });

	const res = await fetch(`https://api-search.anroll.net/data?q=${query}`);
	const { data } = await res.json();

	if (!data.length)
		return Response.json({ error: "anime not found." }, { status: 404 });
	return Response.json({ data });
}