export async function POST(request) {
  const body = await request.json();
  const res = await fetch(body.url, {
    method: "GET",
    headers: body.headers,
    cache: "no-store"
  });

  const headers = {};
  res.headers.forEach((value, key) => {
    headers[key] = value;
  });

  return Response.json(headers);
}
