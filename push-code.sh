#!/bin/bash

while true; do

  current_datetime=$(date +%F\ %T)

 
  # Se déplacer dans le répertoire de votre projet
  cd /loopme

  # Ajouter tous les fichiers modifiés à l'index
  git add .

  # Commit les modifications
  git commit -m "$current_datetime"

  # Pousser les commits sur le dépôt Git Hub
  git push

  sleep 60 * 20
done


# cmd push
./push-code.sh
