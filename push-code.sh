#!/bin/bash

while true; do

  unique_id=$(uuidgen)

 
  # Se déplacer dans le répertoire de votre projet
  cd /loopme

  # Ajouter tous les fichiers modifiés à l'index
  git add .

  # Commit les modifications
  git commit -m "$unique_id"

  # Pousser les commits sur le dépôt Git Hub
  git push

  sleep 60
done


# cmd push
./push-code.sh
