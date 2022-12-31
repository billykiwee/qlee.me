#!/bin/bash

while true; do
 
  # Se déplacer dans le répertoire de votre projet
  cd /chemin/vers/votre/projet

  # Ajouter tous les fichiers modifiés à l'index
  git add .

  # Commit les modifications
  git commit -m "Code pushé automatiquement toutes les 5 minutes"

  # Pousser les commits sur le dépôt Git Hub
  git push origin master

  sleep 300
done
