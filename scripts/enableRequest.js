import DoSearch from "./doRequest.js";
import ConfigObject from "./scriptsPagPrincipal/principal-config.js";
import PrincipalMethods from "./scriptsPagPrincipal/principal-organize.js";
import SetInfoOnPrincipalPageMethods from "./scriptsPagPrincipal/principal-setInfoOnPage.js";
import SecondaryMethods from "./scriptsPagSecundaria/secundario.js";

const searchButton = document.querySelectorAll(".body__box-input__button-submit");
const textSeartchInput = document.querySelectorAll(".body__box-input__search-bar");

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

    const inputValue = ConfigObject.catchSearchtextInputValue(textSeartchInput);
    const configPrefObj = ConfigObject.catchConfigPreferenses(langInput, systemInput);

    locationBox.textContent = PrincipalMethods.setLocalAndTimeInfo(inputValue);

    DoSearch.returnWeatherDataObj(inputValue, configPrefObj)
      .then(async (weatherData) => {
        const allRelevantInfo = await PrincipalMethods.returnAllPrincipalInfoObj(weatherData);
        SetInfoOnPrincipalPageMethods.setInfoOnPrincipalPage(allRelevantInfo, HTMLObjElements);
        SecondaryMethods.returnFourDayObjInfo(weatherData);
      })
      .catch((err) => {
        alert("Ocorreu um erro, verifique se escreveu corretamente o nome da cidade e tente novamente.");
        throw new Error("Parece que houve um erro: " + err);
      });
  });
});
