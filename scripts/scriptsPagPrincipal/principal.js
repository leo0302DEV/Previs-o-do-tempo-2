function catchConfigPreferenses(
  arrLangRadioInput,
  arrSystemRadioInput,
  arrUnityRadioInput
) {
  let langPreferense;
  let systemPreferense;
  let unityPreferense;

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

  for (let k = 0; k < arrUnityRadioInput.length; k++) {
    if (arrUnityRadioInput[k].checked) {
      unityPreferense = arrUnityRadioInput[k].dataset["unity"];
    }
  }

  return {
    lang: langPreferense,
    system: systemPreferense,
    unity: unityPreferense,
  };
}

function catchSearchtextInputValue(inputTypeText) {
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
