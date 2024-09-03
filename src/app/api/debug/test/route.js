export async function POST(request) {
  const body = await request.json();
  const res = await fetch(body.url, {
    headers: body.headers,
    cache: "no-store"
  });

  const data = res.headers;
  return Response.json(data);
}
