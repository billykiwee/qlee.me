#!/bin/bash

# Répertoire contenant les fichiers à traiter
dir="public/images/"

# Fichier JavaScript à créer
output_file="icons.js"

# Initialisation du contenu du fichier JavaScript
echo "export const Icons = [" > $output_file

# Pour chaque fichier dans le répertoire
for file in $dir/*
do
  # Récupération du nom et du type du fichier
  filename=$(basename "$file")
  filetype=$(file -b --mime-type "$file")

  # Ajout du fichier à la liste des fichiers
  echo "  { name: '$filename', type: '$filetype' }," >> $output_file
done

# Fermeture de la liste des fichiers
echo "]" >> $output_file