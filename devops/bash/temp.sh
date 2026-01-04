#!/bin/sh

function factorial() {
  local n=$1

  if [ $n -lt 0 ]; then
    echo "undefined number" >&2
    return 1
  fi

  if [ $n -eq 0 ] || [ $n -eq 1 ]; then
    return 0
  fi

  result=1
  for ((i=2;i<=$n;i++)); do
    echo $i
    result=$((result*=$i))
  done

  echo $result
}

factorial 5
