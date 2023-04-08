async function updateLink(link, collection) {
  const updateData = {
    views: link.views + 1,
  };

  const date =
    new Date().toDateString() + " " + new Date().toTimeString().split(" ")[0];

  collection
    .doc(link.id)
    .update(updateData)
    .then(() => {
      const log = `
✅ New update ${date} 
|- api: http://localhost:3002/${link.id}/qlee.me-api.json
`;

      console.log(log);
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour du document :", error);
    });
}

module.exports = { updateLink };
