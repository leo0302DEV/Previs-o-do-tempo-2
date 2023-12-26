import { API_KEY } from "./lock.js";

const searchGeolocateInfo = async (search) => {
  try {
    const response = await fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${search}&offset=1`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Parece que houve um erro: ${error}.`);
  }
};

const searchWeatherData = async (response, lang, metric) => {
  try {
    const cityCode = response[0].Key;

    const WeatherInfo = await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityCode}?apikey=${API_KEY}&language=${lang}&metric=${metric}`
    );
    const weatherData = await WeatherInfo.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    throw new Error(`Parece que houve um erro: ${error}.`);
  }
};

function doSearch(textsearch, lang, metric) {
  try {
    searchGeolocateInfo(textsearch).then((response) => {
      searchWeatherData(response, lang, metric);
    });
  } catch (error) {
    throw new Error(`Parece que ocorreu um erro: ${error}`);
  }
}

doSearch("vacaria,rs", "pt-br", true);
