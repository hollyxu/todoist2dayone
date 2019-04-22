#!/bin/bash
file="array.txt"
while IFS= read -r contents
do
  read -r date
  dayone2 new $contents --isoDate $date --tags "TODOistImport"
done <"$file"
