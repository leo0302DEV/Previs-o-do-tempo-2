const api_key = "wh2D65icKGq0SFJUCLKTrkzwTodYmqsq";

const searchGeolocateInfo = async (searchText) => {
  try {
    const response = await fetch(
      `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${api_key}&q=${searchText}&offset=1`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Parece que houve um erro: ${error}.`);
  }
};

const searchWeatherData = async (response, weatherObject) => {
  try {
    const cityCode = response[0].Key;
    const lang = weatherObject.lang;
    const system = weatherObject.system;

    const WeatherInfo = await fetch(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityCode}?apikey=${api_key}&language=${lang}&details=true&metric=${system}`
    );
    const weatherDataObj = await WeatherInfo.json();
    return weatherDataObj;
  } catch (error) {
    throw new Error(`Parece que houve um erro: ${error}.`);
  }
};

const returnWeatherDataObj = async (searchText, configObj) => {
  const cityCodeData = await searchGeolocateInfo(searchText);
  const weatherDataObj = await searchWeatherData(cityCodeData, configObj);

  return weatherDataObj;
};

const DoSearch = {
  returnWeatherDataObj,
};

export default DoSearch;
