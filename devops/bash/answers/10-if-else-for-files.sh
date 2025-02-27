#!/bin/bash

# -----------------------------
# method 1
# -----------------------------
file=$(ls | grep -i -o "hello.sh")
# echo "${files}"

if [ "${file}" == "hello.sh" ]; then
    echo "file exist"
else
    echo "file does not exist, but will be created now"
    touch hello.sh
    ls | grep -o "hello.sh"
fi



# -----------------------------
# method 2
# hello.sh is the file that we will check
# -----------------------------
check_file=hello.sh

# -----------------------------
# checks to see if the file exists
# if it does, we will create the file
# -----------------------------
if [ -e "$check_file" ]; then
    echo "$check_file exists"
    ls -l "$check_file"
else
    echo "$check_file does not exist"
    touch "$check_file"
    ls -l "$check_file"
fi


# -----------------------------
# checks to see if the file is executable
# if it is not, we will make it executable
# -----------------------------
if [ -x "$check_file" ]; then
    echo "$check_file is executable"
else
    echo "$check_file is not executable"

    echo "#!/bin/bash" > "$check_file"
    echo "echo \"hello world\"" >> "$check_file"

    chmod +x "$check_file"

    ls -l "$check_file"
fi