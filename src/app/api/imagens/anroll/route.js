export async function GET(request) {
	const query = request.nextUrl.searchParams.get("q");

	if (!query)
		return Response.json({ error: "missing query." }, { status: 401 });

	const res = await fetch(query, {
		headers: {
			"Origin": "https://www.anroll.net",
			"Referer": "https://www.anroll.net/",
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
		},
		cache: "no-store"
	});

	const imageBuffer = await res.arrayBuffer();
	const contentLength = imageBuffer.byteLength;

  return new Response(imageBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/webp",
      "Content-Length": contentLength
    },
  });
}