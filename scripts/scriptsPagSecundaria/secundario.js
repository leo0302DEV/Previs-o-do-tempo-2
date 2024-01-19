import OrganizeHelpers from "../scriptsPagPrincipal/principal-org-helpers.js";

const extractFourDaysInfoArr = (weatherDataObj) => {
  const weatherDataArr = weatherDataObj.DailyForecasts;
  weatherDataArr.shift();
  return weatherDataArr;
}

const helpReturnIconPhraseAndRainInfo = (element) => {
  if (OrganizeHelpers.verifyDayNigth() === "day") {
    return {
      iconCode: element.Day.Icon,
      iconPhrase: element.Day.IconPhrase,
      rainProb: element.Day.PrecipitationProbability,
    };
  } else {
    return {
      iconCode: element.Night.Icon,
      iconPhrase: element.Night.IconPhrase,
      rainProb: element.Night.PrecipitationProbability,
    };
  }
}

const returnFourDaysInfoObj = (argsArr) => {
  const fourDayObjs = argsArr.map((element) => {
    const iconPhraseRainObj = helpReturnIconPhraseAndRainInfo(element);

    return {
      iconCode: iconPhraseRainObj.iconCode,
      phrase: iconPhraseRainObj.iconPhrase,
      rain: iconPhraseRainObj.rainProb,
      maxTemp: element.Temperature.Maximum,
      minTemp: element.Temperature.Minimum,
    };
  });

  return fourDayObjs;
}

const returnFourDayObjInfo = (weatherDataObj) => {
  const fourDayArr = extractFourDaysInfoArr(weatherDataObj);
  const fourDaysInfoObj = returnFourDaysInfoObj(fourDayArr);
  const fourDaysInfoObjStringfied = JSON.stringify(fourDaysInfoObj);

  localStorage.setItem("fourDayInfoObj", fourDaysInfoObjStringfied);
}

const SecondaryMethods = {
  returnFourDayObjInfo,
};

export default SecondaryMethods;
