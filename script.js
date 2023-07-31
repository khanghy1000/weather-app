const appController = () => {
	let apiKey = '1da08ef9dfc248a888e40432233107';
	let apiEndpoint = 'https://api.weatherapi.com/v1/current.json';

	async function getWeather(location) {
		const response = await fetch(
			`${apiEndpoint}?key=${apiKey}&q=${location}`
		);
		if (!response.ok) throw new Error('Cannot get weather');
		const weather = await response.json();
		return weather;
	}

	return { getWeather };
};
