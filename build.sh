rm -r ~/static/*
cp -r ~/src/* ~/static/

find ~/static/ -type f | grep default\\. | while read f; do 
  mv "$f" "$(dirname $(dirname $f))/$(echo $(basename $f) | sed s/default/$(basename $(dirname $f))/)"
done

#find ~/static/ -type f | grep \\.js | while read f; do
#  echo "var fs = require ('fs'); var compiler = require ('surplus/compiler'); console .log (/*compiler .compile (*/fs .readFileSync ('$(realpath --relative-to="./" $f)') .toString ()/*, { sourcemap: 'append' })*/);"
#  node -e "var fs = require ('fs'); var compiler = require ('surplus/compiler'); console .log (/*compiler .compile (*/fs .readFileSync ('$(realpath --relative-to="./" $f)') .toString ()/*, { sourcemap: 'append' })*/);" | tee "$f"
#done