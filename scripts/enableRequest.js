import DoSearch from "./doRequest.js";
import ConfigObject from "./scriptsPagPrincipal/principal.js";

const searchButton = document.querySelectorAll(
  ".body__box-input__button-submit"
);
const textSeartchInput = document.querySelectorAll(
  ".body__box-input__search-bar"
);
const langInput = document.getElementsByName("do-lang");
const systemInput = document.getElementsByName("do-system");
const unityInput = document.getElementsByName("do-unity");

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

    DoSearch.searchGeolocateInfo(seartchInputValue).then((response) => {
      DoSearch.searchWeatherData(
        response,
        configPreferensesObject.lang,
        configPreferensesObject.system
      ).then((weatherData) => {
        console.log(weatherData);
      });
    });
  });
});
