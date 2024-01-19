import OrganizeHelpers from "./principal-org-helpers.js";

const setLocalAndTimeInfo = (local) => {
  const date = new Date();
  const currentDate = date.getDate() + "/" + (date.getMonth() + 1);

  return local + " " + currentDate;
}

const getCurrentDateObject = async (response) => {
  const currentDateObject = await response.DailyForecasts[0];
  return currentDateObject;
}

const getIconAndDescriptionInfo = async (dateObject) => {
  const currentHour = new Date().getHours();

  if (OrganizeHelpers.verifyDayNigth() === "nigth") {
    const nightInfo = await dateObject.Night;
    return {
      icon: nightInfo.Icon,
      iconPhrase: nightInfo.IconPhrase,
    };
  } else {
    const dayInfo = await dateObject.Day;
    return {
      icon: dayInfo.Icon,
      iconPhrase: dayInfo.IconPhrase,
    };
  }
}

const getTemptureInfo = async (dateObject) => {
  const maxTemptureValue = dateObject.Temperature.Maximum.Value;
  const tempUnit = dateObject.Temperature.Maximum.Unit;
  const minTempValue = dateObject.Temperature.Minimum.Value;

  return {
    tempMax: maxTemptureValue,
    tempMin: minTempValue,
    unit: tempUnit,
  };
}

const getOrtherInfo = async (dateObject) => {
  const realFellMax = dateObject.RealFeelTemperature.Maximum.Value;
  const realFellMin = dateObject.RealFeelTemperature.Minimum.Value;
  const realFellAverage = Math.round((realFellMax + realFellMin) / 2);

  if (OrganizeHelpers.verifyDayNigth() === "nigth") {
    const nigthObj = dateObject.Night;
    return {
      ...OrganizeHelpers.helpGetOrtherInfoFunction(nigthObj),
      realFellAverage: realFellAverage,
    };
  } else {
    const dayObj = dateObject.Day;
    return {
      ...OrganizeHelpers.helpGetOrtherInfoFunction(dayObj),
      realFellAverage: realFellAverage,
    };
  }
}

const returnAllPrincipalInfoObj = async (weatherData) => {
  const dateObject = await getCurrentDateObject(weatherData);
  const iconSectionInfo = await getIconAndDescriptionInfo(dateObject);
  const temptureInfo = await getTemptureInfo(dateObject);
  const ortherInfo = await getOrtherInfo(dateObject);

  return {
    iconSectionInfo: iconSectionInfo,
    tempSectionInfo: temptureInfo,
    ortherSectionInfo: ortherInfo,
  };
}

const PrincipalMethods = {
  setLocalAndTimeInfo,
  returnAllPrincipalInfoObj,
};

export default PrincipalMethods;
