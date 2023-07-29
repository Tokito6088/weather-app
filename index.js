const inputda = document.querySelector('input');
const searchbtn = document.getElementById('btn');
const img = document.querySelector('img');
const temp = document.querySelector('.temperature');
const desc = document.querySelector('.description');
const rain_per = document.querySelector('.rain-per');
const wind_per = document.querySelector('.wind-per');
const weather_body = document.getElementById('body');

async function getdata(name) {
	weather_body.style.display = 'flex';
	const notfound = document.querySelector('#err');
	let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=b66ad44dfa67d02a5fa9c9d7ea14e71c`).then((res) => res.json());
	if (data.cod == '404') {
		weather_body.style.display = 'none';
		notfound.style.display = 'block';
	} else {
		weather_body.style.display = 'flex';
		notfound.style.display = 'none';
	}

	const weather_img = document.querySelector('img');
	switch (data.weather[0].main) {
		case 'Clouds':
			weather_img.src = 'assets/cloud.png';
			C: break;
		case 'Clear':
			weather_img.src = 'assets/clear.png';
			break;
		case 'Rain':
			weather_img.src = 'assets/rain.png';
			break;
		case 'Mist':
			weather_img.src = 'assets/mist.png';
			break;
		case 'Snow':
			weather_img.src = 'assets/snow.png';
			break;
	}

	temp.innerHTML = `${Math.round(data.main.temp - 273.15)}0°C`;
	wind_per.innerHTML = `${data.wind.speed} KM/H`;
	rain_per.innerHTML = `${data.main.humidity}%`;
}
searchbtn.addEventListener('click', () => getdata(inputda.value));

window.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		getdata(inputda.value);
	}
});
