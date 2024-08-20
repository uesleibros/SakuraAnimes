const formatosDosGenros = new Map([
	["acao", "ação"],
	["comedia", "comédia"],
	["ficcao-cientifica", "ficção-científica"]
]);

export default function generosFormato(nome) {
	return formatosDosGenros.get(nome) || nome;
}