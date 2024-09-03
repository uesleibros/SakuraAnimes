import VerEpisodio from "@/components/Anime/VerEpisodio";

export default async function AssistirEpisodio({params}) {
	const {slug, episodio} = params;
	
	return (
		<main className="min-h-screen">
			<div>
				<VerEpisodio slug={slug} episodio={episodio} />
			</div>
		</main>
	);
}
