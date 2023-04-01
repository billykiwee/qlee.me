import en from "../../en.json";
import fr from "../../fr.json";

export function translate(str) {
  const variables = str?.variables;

  const id = str.id;

  const languages = { en, fr };

  const userLang = navigator.language || navigator.userLanguage;

  const defaultLang = "en" ?? userLang.split("-")[0];

  const value = languages[defaultLang][id];

  const regex = /{{\s*(\w+)\s*}}/g;

  if (!value) {
    return console.error(`The ID : "${id}" "not found in translations`);
  }
  if (variables) {
    // Pas de variable

    /*  const errorVariables = () => {
        const mustVariables = [];

        value.replaceAll(regex, (key) => {
          const variables = key.replaceAll("{{", "").replaceAll("}}", "");

          mustVariables.push(variables);
        });
        throw new Error(
          `This translations must contains those variables : ${mustVariables.join(
            ", "
          )}.`
        );
      };

      if (!Object.values(variables).length) {
        try {
          errorVariables();
        } catch (err) {
          console.error(err);
        }
      } */

    const mustVariables = [];

    value.replaceAll(regex, (key) => {
      const variables = key.replaceAll("{{", "").replaceAll("}}", "");

      mustVariables.push(variables);
    });

    const ifVariablesDosentMatches = () => {
      const missingElements = mustVariables.filter(
        (el) => !Object.keys(variables).includes(el)
      );

      const extraElements = Object.keys(variables).filter(
        (el) => !mustVariables.includes(el)
      );

      console.log(missingElements, extraElements);

      if (missingElements.length) {
        throw new Error(
          `The variable " ${missingElements.join(
            ", "
          )} " is not asignable to this translation. It must contains : ${mustVariables.join(
            ", "
          )}`
        );
      }
      if (extraElements.length) {
        throw new Error(
          `The variable " ${extraElements.join(
            ", "
          )} " is not asignable to this translation. It must contains : ${mustVariables.join(
            ", "
          )}`
        );
      }
    };
    try {
      ifVariablesDosentMatches();
    } catch (err) {
      console.error(err);
    }
  }

  const removeBrace = (value) => {
    value.replaceAll("{{", "").replaceAll("}}", "");
  };

  if (variables) {
    return value.replaceAll(regex, (key) => {
      const getVariablesValues = key.replaceAll("{{", "").replaceAll("}}", "");

      return variables[getVariablesValues];
    });
  } else {
    return removeBrace(value);
  }
}
