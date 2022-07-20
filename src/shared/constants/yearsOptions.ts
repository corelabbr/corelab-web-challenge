const yearOptions: number[] = [];

const currentYear = new Date().getFullYear();

for (let year = currentYear; year >= 1920; year--) {
	yearOptions.push(year);
}

export { yearOptions };
