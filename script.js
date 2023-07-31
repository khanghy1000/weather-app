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

const screenController = () => {
	const app = appController();

	const form = document.querySelector('form');
	const searchBar = document.querySelector('[data-search-bar]');
	const condition = document.querySelector('[data-condition]');
	const location = document.querySelector('[data-location]');
	const temp = document.querySelector('[data-temp]');
	const fellLike = document.querySelector('[data-fell-like]');
	const wind = document.querySelector('[data-wind]');
	const humidity = document.querySelector('[data-humidity]');

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const location = searchBar.value;
		updateScreen(location);
	});

	async function updateScreen(input) {
		let weather = await app.getWeather(input);
		condition.textContent = weather.current.condition.text;
		location.textContent = `${weather.location.name}, ${weather.location.country}`;
		temp.textContent = weather.current.temp_c;
		fellLike.textContent = `Feels like: ${weather.current.feelslike_c}`;
		wind.textContent = `Wind: ${weather.current.wind_mph} mph`;
		humidity.textContent = `Humidity: ${weather.current.humidity}%`;
	}

	updateScreen('Vietnam');
};

screenController();
