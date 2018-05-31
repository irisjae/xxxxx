rm -r ~/static/*
cp -r ~/src/* ~/static/

find ~/static/ -type f | grep default\\. | while read f; do 
  mv "$f" "$(dirname $(dirname $f))/$(echo $(basename $f) | sed s/default/$(basename $(dirname $f))/)"
done

find ~/static/ -type f | grep \\.js | while read f; do
  node -e "var fs = require ('fs'); var compiler = require ('surplus/compiler'); compiler .compile (fs .readFileSync ('$f'), { sourcemap: 'append' });" | tee "$f"
done