export default function formatAiringEpisode(nextAiringEpisode) {
	const airingDate = new Date(nextAiringEpisode.airingAt * 1000);
	const nextEpisode = nextAiringEpisode.episode;

	const hours = airingDate.getHours().toString().padStart(2, '0');
	const minutes = airingDate.getMinutes().toString().padStart(2, '0');

	const timeUntilAiring = nextAiringEpisode.timeUntilAiring;
	const daysUntilAiring = Math.floor(timeUntilAiring / (24 * 60 * 60));
	const hoursUntilAiring = Math.floor((timeUntilAiring % (24 * 60 * 60)) / (60 * 60));
	const minutesUntilAiring = Math.floor((timeUntilAiring % (60 * 60)) / 60);

	let message;
	if (daysUntilAiring > 0) {
	  message = `Episódio ${nextEpisode} em ${daysUntilAiring} dias às ${hours}:${minutes} horas.`;
	} else {
	  message = `Episódio ${nextEpisode} às ${hoursUntilAiring} horas e ${minutesUntilAiring} minuto.`;
	}

	return message;
}