import SetInfoOnPageHelpers from "./principal-setInfo-helpers.js";

function setPrincipalImgBoxInfo(weatherDataObj, boxImg, imgBoxDescription) {
  const weather = weatherDataObj.iconSectionInfo;
  const weatherDesc = weather.iconPhrase;
  const weatherIconCode = weather.icon;
  const imgSrc = SetInfoOnPageHelpers.returnIconPngBasedOnCode(weatherIconCode);

  imgBoxDescription.innerHTML = weatherDesc;
  boxImg.src = imgSrc;
}

function setPrincipalTemptureInfo(weatherDataObj, maxTemp, minTemp, tempUnit) {
  const weather = weatherDataObj.tempSectionInfo;
  const tempMax = weather.tempMax;
  const tempMin = weather.tempMin;
  const unit = weather.unit;

  maxTemp.textContent = tempMax;
  minTemp.textContent = tempMin;
  tempUnit.forEach((element) => {
    element.textContent = unit;
  });
}

function setPrincipalOrtherInfo(
  weatherDataObj,
  humidityLevel,
  chuvaProb,
  realFellTemp,
  windSpeed,
  windSpeedUnity,
  snowLevel,
  snowLevelUnity
) {
  const weather = weatherDataObj.ortherSectionInfo;
  const humidity = weather.humidity;
  const rain = weather.rain;
  const realFellAverage = weather.realFellAverage;
  const snow = weather.snow;
  const wind = weather.wind;

  humidityLevel.textContent = humidity;
  chuvaProb.textContent = rain;
  realFellTemp.textContent = realFellAverage;

  SetInfoOnPageHelpers.returnWindOrganizedSection(
    windSpeed,
    windSpeedUnity,
    wind
  );

  SetInfoOnPageHelpers.returnSnowOrganizedSection(
    snowLevel,
    snowLevelUnity,
    snow
  );
}

function setInfoOnPrincipalPage(allInfoObj, HTMLObjElements) {
  setPrincipalImgBoxInfo(
    allInfoObj,
    HTMLObjElements.imgBoxImg,
    HTMLObjElements.imgBoxDescription
  );

  setPrincipalTemptureInfo(
    allInfoObj,
    HTMLObjElements.maxTemp,
    HTMLObjElements.minTemp,
    HTMLObjElements.tempUnit
  );

  setPrincipalOrtherInfo(
    allInfoObj,
    HTMLObjElements.humidityLevel,
    HTMLObjElements.chuvaProb,
    HTMLObjElements.realFellTemp,
    HTMLObjElements.windSpeed,
    HTMLObjElements.windSpeedUnity,
    HTMLObjElements.snowLevel,
    HTMLObjElements.snowLevelUnity
  );
}

const SetInfoOnPrincipalPageMethods = {
  setInfoOnPrincipalPage,
};

export default SetInfoOnPrincipalPageMethods;
