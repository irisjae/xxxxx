rm -r ~/static/*
cp -r ~/src/* ~/static/

find ~/static/ -type f | grep default\\. | while read f; do 
  mv "$f" "$(dirname $(dirname $f))/$(echo $(basename $f) | sed s/default/$(basename $(dirname $f))/)"
done

