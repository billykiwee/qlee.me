async function updateLink(link, collection) {
  const updateData = {
    views: link.views + 1,
  };

  collection
    .doc(link.id)
    .update(updateData)
    .then(() => {
      console.log("Document mis à jour avec succès ! :", link);
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour du document :", error);
    });
}

module.exports = { updateLink };
