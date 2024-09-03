import VerEpisodio from "@/components/VerEpisodio";

export default function AssistirEpisodio({params}) {
	const {slug, episodio} = params;
	
	return (
		<main className="min-h-screen">
			<div>
				<VerEpisodio slug={slug} episodio={episodio} />
			</div>
		</main>
	);
}
