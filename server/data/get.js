async function getLink(id, collectionRef) {
  const snapshot = await collectionRef.doc(id).get();

  if (snapshot.exists) {
    return snapshot.data();
  } else {
    return null;
  }
}

module.exports = { getLink };
