export async function POST(request) {
  const body = await request.json();
  let options = {
    method: body?.method || "GET",
    headers: body.headers,
    cache: "no-store"
  };

  if (body?.method === "POST")
    options.data = JSON.stringify(body?.json);
  
  const res = await fetch(body.url, options);

  const data = await res.text();
  return Response.json(data);
}
