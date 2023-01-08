#!/bin/bash

while true; do

  current_datetime=$(date +%F\ %T)

  cd /loopme

  git add .
  git commit -m "$current_datetime"
  git push

  minute=15
  time=$((minute * 60))

  sleep $time
done


# cmd push
./push.sh

