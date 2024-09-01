import config from "@/config";

async function pegarAnimeAleatorioInformacoes(id) {
	const res = await fetch(`https://www.anroll.net/_next/data/${config.anroll.buildId}/a/${id}.json?anime=${id}`, {
		cache: "no-store"
	});
	const catalog = await res.json();

	return catalog.pageProps.data;
}

export async function GET() {
	const res = await fetch(`https://www.anroll.net/_next/data/${config.anroll.buildId}/random.json`, {
		cache: "no-store"
	});
	const catalog = await res.json();
	const data = await pegarAnimeAleatorioInformacoes(catalog.pageProps["__N_REDIRECT"].split("/")[2]);

	return Response.json({ data });
}