#!/bin/bash

greet=hello
echo $greet

welcome="Hello world, bash rules your terminal"
echo ${welcome}

echo ""
echo ${welcome/bash/makefile}

echo ""
echo "sliced: ${welcome::5}"

echo ""
echo "sliced: ${welcome:18:-9}"