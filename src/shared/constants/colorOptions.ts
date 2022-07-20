export const colorOptions = [
	{
		name: "AMARELO",
		color: "#FFFF00",
	},
	{
		name: "AZUL",
		color: "#0000FF",
	},
	{
		name: "BRANCO",
		color: "#FFFFFF",
	},
	{
		name: "CINZA",
		color: "#808080",
	},
	{
		name: "LARANJA",
		color: "#FFA500",
	},
	{
		name: "MARRON",
		color: "#8B4513",
	},
	{
		name: "OURO",
		color: "#FFD700",
	},
	{
		name: "PRATA",
		color: "#C0C0C0",
	},
	{
		name: "PRETO",
		color: "#000000",
	},
	{
		name: "ROSA",
		color: "#FF1493",
	},
	{
		name: "VERDE",
		color: "#008000",
	},
	{
		name: "VERMELHO",
		color: "#FF0000",
	},
];

const colors = {};

for (let color of colorOptions) {
	colors[color.name] = color.color;
}

export { colors };
