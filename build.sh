rm -r ~/static/*
cp -r ~/src/* ~/static/

find ~/static/ -type f | grep default | while read f; do 
