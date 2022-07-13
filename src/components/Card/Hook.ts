export default function setColor(color: string){
	switch (color) {
	case 'Vermelho':
		return'248, 1, 1, 0.4';

	case 'Azul':
		return '1, 38, 248, 0.4';

	case 'Preto':
		return '21, 22, 22, 0.6';

	case 'Prata':
		return'172, 181, 181, 0.7';

	case 'Branco':
		return'225, 218, 218, 0.4';

	case 'Amarelo':
		return'255, 244, 0, 0.4';

	case 'Marrom':
		return'104, 36, 42, 0.4';

	case 'Verde':
		return'28, 237, 53, 0.4';

	default:
		break;
	}
}