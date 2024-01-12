const api_key = "	wh2D65icKGq0SFJUCLKTrkzwTodYmqsq";

async function searchGeolocateInfo(search) {
  try {
    const response = await fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${api_key}&q=${search}&offset=1`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Parece que houve um erro: ${error}.`);
  }
}

async function searchWeatherData(response, lang, metric) {
  try {
    const cityCode = response[0].Key;

    const WeatherInfo = await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityCode}?apikey=${api_key}&language=${lang}&details=true&metric=${metric}`
    );
    const weatherData = await WeatherInfo.json();
    return weatherData;
  } catch (error) {
    throw new Error(`Parece que houve um erro: ${error}.`);
  }
}

const DoSearch = {
  searchGeolocateInfo,
  searchWeatherData,
};

export default DoSearch;
