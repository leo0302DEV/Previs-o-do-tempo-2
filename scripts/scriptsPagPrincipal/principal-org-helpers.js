const verifyDayNigth = () => {
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

const helpGetOrtherInfoFunction = (timeSet) => {
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

const OrganizeHelpers = {
  verifyDayNigth,
  helpGetOrtherInfoFunction,
};

export default OrganizeHelpers;
