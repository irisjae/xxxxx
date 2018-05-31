rm -r ~/static/*
cp -r ~/src/* ~/static/

find ~/static/ -type f | grep -v default/ | grep default\\. | while read f; do 
  mv "$f" "$(dirname $(dirname $f))/$(echo $(basename $f) | sed s/default/$(basename $(dirname $f))/)"
done

find ~/static/ -type f | grep -v default/ | grep \\.js | while read f; do
#  node -e "var fs = require ('fs'); console .log (fs .readFileSync ('$(realpath --relative-to="./" $f)') .toString ());"
  echo "$(node -e "var fs = require ('fs'); var compiler = require ('surplus/compiler'); console .log (compiler .compile (fs .readFileSync ('$(realpath --relative-to="./" $f)') .toString (), { sourcemap: 'append' }));")" > "$f"
done

touch ~/static/default.js
find ~/static/ -type f | grep default/ | grep \\.js | grep -v default\\.js | while read f; do
  cat "$f" >> ~/static/default.js
  rm "$f"
done
cat ~/static/default/default.js >> ~/static/default.js
rm ~/static/default/default.js