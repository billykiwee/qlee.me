import React from "react";
import { serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../../../../App/database/firebase";
import { generateLetterImage } from "../../../../../App/utils/generateLetterImage";
import { loginConditions } from "../conditions";

export function byEmail(e, userID, setMSG, history, snackBar, redirect) {
  e.preventDefault();

  const elements = e.target.elements;

  const email = elements.email.value;
  const password = elements.password.value;

  const { Name, Email, Password } = loginConditions;

  if (!email.match(Email.rules.regex))
    throw Email.error("Veuillez entrer un email valide");
  else Email.error("");

  if (password.length < Password.rules.length.min) {
    throw Password.error(
      `Le mot de passe doit contenir au moins ${Password.rules.length.min} caractères`
    );
  } else if (!password.match(Password.rules.regex.special)) {
    throw Password.error("Le mot de passe doit contenir un caractère spécial");
  } else if (!password.match(Password.rules.regex.number)) {
    throw Password.error("Le mot de passe doit contenir un nombre");
  } else Password.error("");

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(async () => {
      await db
        .collection("users")
        .doc(email)
        .set({
          plan: "FREE",
          id: userID,
          name: email.split("@")[0],
          email: email,
          link_in_bio: email.split("@")[0],
          photoURL: generateLetterImage(email.split("")[0].toUpperCase()),
          date: serverTimestamp(),
        });

      if (!redirect) history("/dashboard");

      snackBar.add({
        text: " Connexion réussie",
      });
    })
    .catch((error) => {
      //console.error(error)
      setMSG({
        statu: "error",
        msg: "L'adresse mail est associé à un autre compte",
      });
    });
}
