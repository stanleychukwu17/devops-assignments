#!/bin/bash

# -----------------------------
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