#!/bin/bash

# using default when no argument is passed

greet () {
    echo "hello ${1:-"stanley"}"
}

greet "adam ziRa"
greet