arg1=$1
arg2=$2

echo "working for \$@"
for i in $@; do
    echo "$i"
done

echo ""
echo "working for \$*"
for i in $*; do
    echo "$i"
done

echo ""
echo 'working for "\$@"'
for i in "$@"; do
    echo "$i"
done

echo ""
echo 'working for "\$*"'
for i in "$*"; do
    echo "$i"
done