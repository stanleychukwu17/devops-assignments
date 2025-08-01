#!/bin/bash

greet=hello
echo $greet

welcome="bash rules your terminal, use bash today"
echo ${welcome}

echo ""
echo ${welcome/bash/makefile}
echo ${welcome//bash/golang}

echo ""
echo "sliced: ${welcome::11}"

echo ""
echo "sliced: ${welcome:18:-9}"