export async function POST(request) {
	try {
		const body = await request.json();
		const res = await fetch("https://graphql.anilist.co", {
			method: "POST",
			body: JSON.stringify({
        query: body.query,
        variables: body.variables
      }),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			next: { revalidate: 3600 }
		});

		const {data} = await res.json();
		return Response.json({ data });
	} catch (err) {
		console.log(err);
		return Response.json({ error: "Invalid data" }, { status: 400 });
	}
}
