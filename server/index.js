const express = require("express");
const path = require("path");
require("dotenv").config();

var admin = require("firebase-admin");

const json = require("./firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(json),
  databaseURL:
    "https://likeme-2b112-default-rtdb.europe-west1.firebasedatabase.app",
});

const db = admin.firestore();

const collectionRef = db.collection("links");

const app = express();

const port = 3002;

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.send("Qlee.me redirect is now in process");
});

async function getData(collectionRef) {
  const dataJSON = [];
  await collectionRef
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();

        return dataJSON.push(data);
      });
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des documents :", err);
    });

  return dataJSON;
}

getData(collectionRef)
  .then((data) => {
    app.get("/:id", (req, res) => {
      const link = data.find((link) => link.id === req.params.id);

      if (link) {
        updateLink(link);

        res.redirect(link.url);
      }
    });

    app.listen(port, () => {
      console.log(`Running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

async function updateLink(link) {
  const updateData = {
    views: link.views + 1,
  };

  collectionRef
    .doc(link.id)
    .update(updateData)
    .then(() => {
      console.log("Document mis à jour avec succès ! :", link);
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour du document :", error);
    });
}
