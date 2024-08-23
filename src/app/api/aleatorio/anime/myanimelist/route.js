export async function GET() {
	const res = await fetch("https://api.jikan.moe/v4/random/anime", {
		cache: "no-store"
	});
	const {data} = await res.json();

	return Response.json({ data });
}