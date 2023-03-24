export const colors = [
  "var(--blue)",
  "black",
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#34495e",
  "#16a085",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#ecf0f1",
  "#95a5a6",
  "#f39c12",
  "#d35400",
  "#c0392b",
  "#bdc3c7",
  "#7f8c8d",
];

export function generateLetterImage(letter) {
  // Créer un élément canvas
  var canvas = document.createElement("canvas");
  // Définir la largeur et la hauteur du canvas
  canvas.width = 200;
  canvas.height = 200;
  // Récupérer le contexte 2D du canvas
  var ctx = canvas.getContext("2d");
  // Définir les propriétés de style pour le texte
  ctx.font = "100px Space Mono";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // Générer une couleur de fond aléatoire
  var randomColor = colors[Math.floor(Math.random() * 10)];
  // Définir la couleur de fond du canvas
  ctx.fillStyle = randomColor;
  // Dessiner un rectangle de fond sur le canvas
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Définir la couleur de remplissage du texte
  ctx.fillStyle = "white";
  // Dessiner le texte sur le canvas
  ctx.fillText(letter, canvas.width / 2, canvas.height / 2);
  // Retourner l'image générée
  return canvas.toDataURL();
}
