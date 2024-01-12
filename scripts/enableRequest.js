import DoSearch from "./doRequest.js";
import ConfigObject from "./scriptsPagPrincipal/principal-config.js";
import PrincipalMethods from "./scriptsPagPrincipal/principal-organize.js";
import SetInfoOnPageMethods from "./scriptsPagPrincipal/principal-setInfoOnPage.js";

// Variaveis referentes a lógica da requisição
const searchButton = document.querySelectorAll(
  ".body__box-input__button-submit"
);
const textSeartchInput = document.querySelectorAll(
  ".body__box-input__search-bar"
);

// Variaveis referentes ao documento index.html
const langInput = document.getElementsByName("do-lang");
const systemInput = document.getElementsByName("do-system");
const locationBox = document.querySelector(".location__name");
const imgBoxImg = document.querySelector(".section__img");
const imgBoxDescription = document.querySelector(
  ".section__weather-description"
);
const maxTemp = document.querySelector(".temp-max__value");
const minTemp = document.querySelector(".temp-min__value");
const tempUnit = document.querySelectorAll(".temp__unit");
const humidityLevel = document.querySelector(".humidity__level-value");
const chuvaProb = document.querySelector(".rain__value");
const realFellTemp = document.querySelector(".like-temp__value");
const windSpeed = document.querySelector(".wind__speed-value");
const windSpeedUnity = document.querySelector(".wind__speed-unit");
const snowLevel = document.querySelector(".snow__level-value");
const snowLevelUnity = document.querySelector(".snow__level-unit");

// variaveis referentes ao documento more-info.html

searchButton.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const seartchInputValue =
      ConfigObject.catchSearchtextInputValue(textSeartchInput);
    const configPreferensesObject = ConfigObject.catchConfigPreferenses(
      langInput,
      systemInput
    );

    locationBox.textContent =
      PrincipalMethods.setLocalAndTimeInfo(seartchInputValue);

    DoSearch.searchGeolocateInfo(seartchInputValue)
      .then((response) => {
        return DoSearch.searchWeatherData(
          response,
          configPreferensesObject.lang,
          configPreferensesObject.system
        );
      })
      .then(async (weatherData) => {
        const allRelevantInfo =
          await PrincipalMethods.returnAllPrincipalInfoObj(weatherData);

        return allRelevantInfo;
      })
      .then((allInfoObj) => {
        SetInfoOnPageMethods.setInfoOnPrincipalPage(
          allInfoObj,
          imgBoxImg,
          imgBoxDescription,
          maxTemp,
          minTemp,
          tempUnit,
          humidityLevel,
          chuvaProb,
          realFellTemp,
          windSpeed,
          windSpeedUnity,
          snowLevel,
          snowLevelUnity
        );
      })
      .catch((err) => {
        throw new Error("Parece que houve um erro: " + err);
      });
  });
});
