const express = require("express");
const path = require("path");
require("dotenv").config();

var admin = require("firebase-admin");

const json = require("./firebase.json");
const { updateLink } = require("./data/update");

const { getStatistics } = require("./statistics/statistics");
const { getLink } = require("./data/get");
const open = require("open");

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

app.get("/:id", async (req, res) => {
  const startLoading = performance.now();

  const link = await getLink(req.params.id, collectionRef);

  await updateLink(link, collectionRef);

  const end = performance.now();
  const endLoading = end - startLoading;

  const statsCollection = db.collection("statistics");

  const stats = await getStatistics(req, link, endLoading);
  statsCollection.add(stats);

  //res.write(`${JSON.stringify(stats, null, 2)} `);

  res.redirect(link.url);

  res.send();
});

// Check json api
app.get("/:id/qlee.me-api.json", async (req, res) => {
  const link = await getLink(
    req.params.id.split("/qlee.me-api.json")[0],
    collectionRef
  );

  res.write(`${JSON.stringify(link, null, 2)} `);

  res.send();
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
