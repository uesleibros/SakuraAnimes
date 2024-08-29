export async function GET(request) {
	const id = request.nextUrl.searchParams.get("id");

	if (!id)
		return Response.json({ error: "missing ep_id." }, { status: 404 });

	const res = await fetch(`https://www.anroll.net/_next/data/nxb43Ok4qvT2cAlD0OLS1/e/${id}.json?episode=${id}`, {
		headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
			"Referer": "https://www.anroll.net/"
		},
		cache: "no-store"
	});

	const catalog = await res.json();
	const data = catalog.pageProps.data;

	return Response.json({ data });
}