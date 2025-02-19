#!/bin/bash

set -euo pipefail

# stores the filename in the file variable
file=4.3-coverage.txt

# checks to see if the file exists
if [ ! -f "$file" ]; then
    echo "coverage file missing"
    exit 1
fi

# grab the total line, should look like: "total:        88.4%"
total=$(cat "$file" | grep "total:")

# grab the coverage percentage
# awk - $NF gets the last column/field
# sed 's/%//' removes the % and replaces with nothing
percent=$(echo "${total}" | awk '{print $NF}' | sed 's/%//')

# convert to nearest integer
percent=$(printf "%.0f" "$percent")

# checks to see if the coverage is below 80
if [ $percent -le 80 ]; then
    echo "coverage is below 80%"
    exit 1
else
    echo "coverage (${percent}%) is above 80%"
fi
