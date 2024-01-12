import DoSearch from "./doRequest.js";
import ConfigObject from "./scriptsPagPrincipal/principal-config.js";
import PrincipalMethods from "./scriptsPagPrincipal/principal-organize.js";

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
const unityInput = document.getElementsByName("do-unity");

const locationBox = document.querySelector(".location__name");

// variaveis referentes ao documento more-info.html

searchButton.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const seartchInputValue =
      ConfigObject.catchSearchtextInputValue(textSeartchInput);
    const configPreferensesObject = ConfigObject.catchConfigPreferenses(
      langInput,
      systemInput,
      unityInput
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
        const dateObject = await PrincipalMethods.getCurrentDateObject(
          weatherData
        );

        const iconSectionInfo =
          await PrincipalMethods.getIconAndDescriptionInfo(dateObject);

        const temptureInfo = await PrincipalMethods.getTemptureInfo(dateObject);

        const ortherInfo = await PrincipalMethods.getOrtherInfo(dateObject);
      })
      .catch((err) => {
        throw new Error("Parece que houve um erro: " + err);
      });
  });
});
