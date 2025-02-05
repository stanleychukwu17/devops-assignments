#!/bin/bash

# my way
i=1
cat names.txt | while read name; do
    echo "$i $name"
    ((i++))
done

echo -e "\n\n from GPT \n\n"

# from chatGPT
i=1
while read name; do
    echo "$i $name"
    ((i++))
done < names.txt
