import SetInfoOnPageHelpers from "../scriptsPagPrincipal/principal-setInfo-helpers.js";

const arrFourDayInfo = JSON.parse(localStorage.getItem("fourDayInfoObj"));

const HTMLelementsObj = {
  arrImgBox: document.querySelectorAll(".icone-section__icon"),
  arrDescriptionBox: document.querySelectorAll(".icone-section__description"),
  arrMaxTemp: document.querySelectorAll(".temp-max__value"),
  arrMinTemp: document.querySelectorAll(".temp-min__value"),
  arrRainProb: document.querySelectorAll(".temp-rain__value"),
  arrTempUnity: document.querySelectorAll(".temp__unit"),
};
const arrDateBox = document.querySelectorAll(".dia__titulo");

function showInfoOnPage(arrDaysInfo, HTMLelementsObj) {
  for (let i = 0; i < 4; i++) {
    const currentObj = arrDaysInfo[i];

    const iconPngWay = SetInfoOnPageHelpers.returnIconPngBasedOnCode(
      currentObj.iconCode
    );
    const iconPhrase = currentObj.phrase;
    const rainProb = currentObj.rain;
    const maxTempValue = currentObj.maxTemp.Value;
    const minTempValue = currentObj.minTemp.Value;
    const unity = currentObj.maxTemp.Unit;

    HTMLelementsObj.arrImgBox[i].src = iconPngWay;
    HTMLelementsObj.arrDescriptionBox[i].textContent = iconPhrase;
    HTMLelementsObj.arrMaxTemp[i].textContent = maxTempValue;
    HTMLelementsObj.arrMinTemp[i].textContent = minTempValue;
    HTMLelementsObj.arrRainProb[i].textContent = rainProb;
    HTMLelementsObj.arrTempUnity[i].textContent = unity;
  }
}

function showDateOnPage(arrDate) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;

  for (let j = 0; j < arrDate.length; j++) {
    const currentBoxDateContent = arrDate[j];
    const dayLogic = day + j + 1;
    const date = dayLogic + "/" + month;

    currentBoxDateContent.textContent = date;
  }
}

showDateOnPage(arrDateBox);
showInfoOnPage(arrFourDayInfo, HTMLelementsObj);
