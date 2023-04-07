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

module.exports = { getData };
