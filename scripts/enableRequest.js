import DoSearch from "./doRequest.js";
import ConfigObject from "./scriptsPagPrincipal/principal-config.js";
import PrincipalMethods from "./scriptsPagPrincipal/principal-organize.js";
import SetInfoOnPrincipalPageMethods from "./scriptsPagPrincipal/principal-setInfoOnPage.js";
import secondaryMethods from "./scriptsPagSecundaria/secundario.js";

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
const HTMLObjElements = {
  imgBoxImg: document.querySelector(".section__img"),
  imgBoxDescription: document.querySelector(".section__weather-description"),
  maxTemp: document.querySelector(".temp-max__value"),
  minTemp: document.querySelector(".temp-min__value"),
  tempUnit: document.querySelectorAll(".temp__unit"),
  humidityLevel: document.querySelector(".humidity__level-value"),
  chuvaProb: document.querySelector(".rain__value"),
  realFellTemp: document.querySelector(".like-temp__value"),
  windSpeed: document.querySelector(".wind__speed-value"),
  windSpeedUnity: document.querySelector(".wind__speed-unit"),
  snowLevel: document.querySelector(".snow__level-value"),
  snowLevelUnity: document.querySelector(".snow__level-unit"),
};

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

        secondaryMethods.returnFourDayObjInfo(weatherData);

        return allRelevantInfo;
      })
      .then((allInfoObj) => {
        SetInfoOnPrincipalPageMethods.setInfoOnPrincipalPage(
          allInfoObj,
          HTMLObjElements
        );
      })
      .catch((err) => {
        alert(
          "Ocorreu um erro, verifique se escreveu corretamente o nome da cidade ou tente novamente mais tarde."
        );
        throw new Error("Parece que houve um erro: " + err);
      });
  });
});
