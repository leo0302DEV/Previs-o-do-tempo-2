const returnIconPngBasedOnCode = (iconCode) => {
  switch (iconCode) {
    case 1:
      return "./assets/Dia-ensolarado.png";
    case 2:
    case 3:
    case 4:
    case 5:
      return "./assets/Dia-parcialmente-nublado.png";
    case 6:
    case 7:
    case 8:
    case 20:
    case 21:
      return "./assets/Dia-nublado.png";
    case 33:
      return "./assets/Noite-limpa.png";
    case 34:
    case 35:
    case 36:
    case 37:
      return "./assets/Noite-parcialmente-nublada.png";
    case 38:
      return "./assets/Noite-nublada.png";
    case 11:
      return "./assets/nevoa.png";
    case 25:
    case 26:
      return "./assets/granizo.png";
    case 32:
      return "./assets/ventoso.png";
    case 12:
    case 13:
    case 14:
    case 18:
    case 19:
    case 39:
    case 40:
    case 43:
      return "./assets/chuva.png";
    case 15:
    case 16:
    case 17:
    case 41:
    case 42:
      return "./assets/trovao.png";
    case 22:
    case 23:
    case 24:
    case 29:
    case 44:
      return "./assets/neve.png";
    default:
      return "./assets/wating.png";
  }
}

const returnWindOrganizedSection = (speed, unity, windObj) => {
  const windSpeed = windObj.value;
  const windUnity = windObj.unit;

  speed.textContent = windSpeed;
  unity.textContent = windUnity;
}

const returnSnowOrganizedSection = (level, unity, snowObj) => {
  const snowLevel = snowObj.value;
  const snowUnity = snowObj.unit;

  level.textContent = snowLevel;
  unity.textContent = snowUnity;
}

const SetInfoOnPageHelpers = {
  returnIconPngBasedOnCode,
  returnWindOrganizedSection,
  returnSnowOrganizedSection,
};

export default SetInfoOnPageHelpers;
