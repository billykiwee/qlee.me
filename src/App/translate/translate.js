import fr from "./fr.json";
import en from "./en.json";

export default function translate(lang, ref) {
  const defaultLanguage = "fr";

  const languages = {
    fr: fr,
    en: en,
  };

  const location = window.location.pathname;

  const arr = languages[lang][location];

  const index = arr.indexOf(ref);

  const userLanguage = navigator.language.split("-")[0];

  const langCheck = () => {
    if (defaultLanguage !== userLanguage) return userLanguage;
    else return defaultLanguage;
  };

  return languages[langCheck()][location][index];
}

function getTextDOM() {
  const allTexts = [];

  function getTexts(element) {
    const children = element.childNodes;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent.trim();

        if (text.length > 1) {
          return allTexts.push(text);
        }
      } else {
        getTexts(child);
      }
    }
  }

  getTexts(document.body);

  return {
    [window.location.pathname]: allTexts,
  };
}
const stringify = JSON.stringify(getTextDOM());

document.write(stringify);
