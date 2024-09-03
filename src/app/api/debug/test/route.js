export async function POST(request) {
  const body = await request.json();
  const res = await fetch(body.url, {
    method: "GET",
    headers: body.headers,
    cache: "no-store"
  });

  const data = await res.text();
  return Response.json(data);
}
