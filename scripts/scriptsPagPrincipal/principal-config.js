const catchConfigPreferenses = (arrLangRadioInput, arrSystemRadioInput) => {
  let langPreferense;
  let systemPreferense;

  for (let i = 0; i < arrLangRadioInput.length; i++) {
    if (arrLangRadioInput[i].checked) {
      langPreferense = arrLangRadioInput[i].dataset["lang"];
    }
  }

  for (let j = 0; j < arrSystemRadioInput.length; j++) {
    if (arrSystemRadioInput[j].checked) {
      systemPreferense = arrSystemRadioInput[j].dataset["system"];
    }
  }

  return {
    lang: langPreferense,
    system: systemPreferense,
  };
}

const catchSearchtextInputValue = (inputTypeText) => {
  let inputValue;
  inputTypeText.forEach((element) => {
    if (element.value !== "") {
      inputValue = element.value;
    }
  });
  return inputValue;
}

const ConfigObject = {
  catchConfigPreferenses,
  catchSearchtextInputValue,
};

export default ConfigObject;
