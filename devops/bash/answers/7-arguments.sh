#!/bin/bash

# names is the array, and current is the index in the array
names=()
current=0

# loop through the argument and add the arguments to the name array
for i in "$@"; do
  echo $i
  names[current]=$i
  ((current++))
done

# printout the content in the array
echo "${names[@]}"