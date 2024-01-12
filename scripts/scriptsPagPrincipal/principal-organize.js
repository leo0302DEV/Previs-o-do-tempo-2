function setLocalAndTimeInfo(local) {
  const date = new Date();
  const currentDate = date.getDate() + "/" + (date.getMonth() + 1);

  return local + " " + currentDate;
}

function verifyDayNigth() {
  const currentHour = new Date().getHours();

  if (
    (currentHour >= 18 && currentHour <= 23) ||
    (currentHour >= 0 && currentHour <= 5)
  ) {
    return "nigth";
  } else {
    return "day";
  }
}

async function getCurrentDateObject(response) {
  const currentDateObject = await response.DailyForecasts[0];
  return currentDateObject;
}

async function getIconAndDescriptionInfo(dateObject) {
  const currentHour = new Date().getHours();

  if (verifyDayNigth() === "nigth") {
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

async function getTemptureInfo(dateObject) {
  const maxTemptureValue = dateObject.Temperature.Maximum.Value;
  const tempUnit = dateObject.Temperature.Maximum.Unit;
  const minTempValue = dateObject.Temperature.Minimum.Value;

  return {
    tempMax: maxTemptureValue,
    tempMin: minTempValue,
    unit: tempUnit,
  };
}

function helpGetOrtherInfoFunction(timeSet) {
  const snow = {
    value: timeSet.Snow.Value,
    unit: timeSet.Snow.Unit,
  };
  const rain = timeSet.PrecipitationProbability;
  const humidity = timeSet.RelativeHumidity.Average;
  const wind = {
    value: timeSet.Wind.Speed.Value,
    unit: timeSet.Wind.Speed.Unit,
  };

  const ortherInfoCompletObj = {
    snow: snow,
    rain: rain,
    humidity: humidity,
    wind: wind,
  };

  return ortherInfoCompletObj;
}

async function getOrtherInfo(dateObject) {
  const realFellMax = dateObject.RealFeelTemperature.Maximum.Value;
  const realFellMin = dateObject.RealFeelTemperature.Minimum.Value;
  const realFellAverage = Math.round((realFellMax + realFellMin) / 2);

  if (verifyDayNigth() === "nigth") {
    const nigthObj = dateObject.Night;
    return {
      ...helpGetOrtherInfoFunction(nigthObj),
      realFellAverage: realFellAverage,
    };
  } else {
    const dayObj = dateObject.Day;
    return {
      ...helpGetOrtherInfoFunction(dayObj),
      realFellAverage: realFellAverage,
    };
  }
}

const PrincipalMethods = {
  setLocalAndTimeInfo,
  getCurrentDateObject,
  getIconAndDescriptionInfo,
  getTemptureInfo,
  getOrtherInfo,
};

export default PrincipalMethods;
