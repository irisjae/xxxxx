find ~/static -type f | grep \\.js | grep -v default\\.js | xargs -I {} rm {}
find ~/static -type f | grep default\\. | grep -v default\\.js | xargs -I {} rm {}
find ~/src -maxdepth 1 | grep -v default | xargs -I {} cp -r {} ~/static

find ~/static/ -type f ! -path ~/static/default.js | grep default | while read f; do 
  mv "$f" "$(dirname $(dirname $f))/$(echo $(basename $f) | sed s/default/$(basename $(dirname $f))/)"
done

find ~/static/ -type f ! -path ~/static/default.js | grep \\.js | while read f; do
  echo "$(node -e "var fs = require ('fs'); var compiler = require ('surplus/compiler'); console .log (compiler .compile (fs .readFileSync ('$f') .toString (), { sourcemap: 'append' }));")" > "$f"
done

find ~/src/default -type f | grep default\\. | grep -v default\\.js | while read f; do
  cp "$f" ~/static/
done

find ~/static/ -type d -empty -delete