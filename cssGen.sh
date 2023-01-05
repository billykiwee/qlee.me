#!/bin/bash

# Créer un fichier CSS vide
touch cssGen.css

dir='p-1'  

rule_added=false

# Rechercher le mot clé 'w-2' dans tous les fichiers
for file in $(grep -rl $dir .); do
  # Si la règle n'a pas encore été ajoutée
  if [[ "$rule_added" == false ]]; then
    # Extraire le nom du dossier du chemin du fichier

    # Ajouter une règle CSS au fichier cssGen.css
    echo "
.$dir { 
    width: 2px; 
}" >> cssGen.css
    # Mettre à jour l'indicateur
    rule_added=true
  fi
done

# ./cssGen.sh