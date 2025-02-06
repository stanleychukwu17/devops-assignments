#!/bin/bash
# loop through a file
for i in `cat names.txt`; do
    echo "$i"
done

echo -e "\n\n from GPT \n\n"
# from chatGPT
for i in $(cat names.txt); do
    echo "$i"
done

# loop through an array
arr=(1 2 3 4 5)
for i in "${arr[@]}"; do
    echo "$i"
done

# loop through a string
str="hello world"
for i in $str; do
    echo "$i"
done

echo ""
# loop through an argument
for i in "$@"; do
    echo "$i"
done

echo ""
# loop each argument
for i in $1 $2 $3; do
    echo "$i"
done