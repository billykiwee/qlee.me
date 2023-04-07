const express = require("express");
const path = require("path");
require("dotenv").config();
const { performance } = require("perf_hooks");

var admin = require("firebase-admin");

const json = require("./firebase.json");
const { updateLink } = require("./data/update");
const { serverTimestamp } = require("firebase/firestore");
const { getStatistics } = require("./statistics/statistics");

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

app.get("/:id", async (req, res) => {
  const startLoading = performance.now();

  const link = await getLink(req.params.id);
  if (link) {
    await updateLink(link, collectionRef);

    // res.redirect(link.url);

    const end = performance.now();
    const endLoading = end - startLoading;

    const stats = await getStatistics(req, link, endLoading);

    res.write(`${JSON.stringify(stats, null, 2)} `);

    res.send();
  }
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});

async function getLink(id) {
  const snapshot = await collectionRef.doc(id).get();
  if (snapshot.exists) {
    return snapshot.data();
  } else {
    return null;
  }
}
