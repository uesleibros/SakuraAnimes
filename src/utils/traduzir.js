export default async function traduzir(texto) {
	const res = await fetch("https://libretranslate.com/translate", {
		method: "POST",
		body: JSON.stringify({
			q: texto,
			source: "en",
			target: "pt",
			format: "text",
			api_key: "",
			alternatives: 3,
			secret: "JRL0DCF"
		}),
		headers: {
			"Content-Type": "application/json",
			"Origin": "https://libretranslate.com",
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
		},
		cache: "no-store"
	});
	const data = await res.json();
	return data.translatedText;
}