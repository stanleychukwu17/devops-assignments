#!/bin/bash

#---------------------------------------
# simple function
#---------------------------------------
hello () {
    echo "hello world"
    ls -1
    echo -e "\n bye, listed all the directories \n"
}

# calls the function
hello


#---------------------------------------
# function with arguments
#---------------------------------------
greet () {
    echo "hello $1"
}
greet "stanley"


#---------------------------------------
# function with multiple arguments
#---------------------------------------
# eg-1:
sum () {
    local total=$(($1+$2))
    echo "total is ${total}"
}
sum 15 2

# eg-2:
all_values () {
    echo -e "$@ \n"
    for i in "$@"; do
        echo $i
    done
}
all_values stanley chukwu edward "from ukraine"


#---------------------------------------
# function with return value
#---------------------------------------
# eg-1:
factorial () {
    local n=$1
    local fact=1
    for ((i=1; i<=n; i++)); do
        fact=$((fact * i))
    done
    echo $fact
}
result=$(factorial 5)

# eg-2:
sum2 () {
    local total=$(($1+$2))
    echo $total
}
ideal=$(sum2 15 2)
echo "ideal is: $ideal"

#---------------------------------------
# using default when no argument is passed
#---------------------------------------
greet_men_them () {
    echo "hello ${1:-"stanley"}"
}

greet_men_them "adam ziRa"
greet_men_them


#---------------------------------------
# recursive functions
#---------------------------------------
factorial_2 () {
    if [ "$1" -eq 1 ]; then
        echo "1"
    else
        local result=$(($1 * $(factorial_2 $(($1-1)))))
        echo $result
    fi
}