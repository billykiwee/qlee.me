const express = require("express");
const path = require("path");

var admin = require("firebase-admin");

var serviceAccount = require("./firebaseDATA.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://likeme-2b112-default-rtdb.europe-west1.firebasedatabase.app",
});

const db = admin.firestore();
const collectionRef = db.collection("links");

async function getData() {
  const dataJSON = [];
  await collectionRef
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        return dataJSON.push(doc.data());
      });
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des documents :", err);
    });

  return dataJSON;
}

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.send("API is working");
});

getData()
  .then((data) => {
    app.get("/:id", (req, res) => {
      let url = "";
      data.map((link) => {
        if (link.id === req.params.id) {
          url = link.url;
        }
      });
      res.redirect(url);
    });

    app.listen(port, () => {
      console.log(
        `Application en cours d'exécution sur http://localhost:${port}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
