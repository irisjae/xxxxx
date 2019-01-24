rm -r ~/static/*
cp -r ~/src/* ~/static/

find ~/static/ -type f | grep -v default/ | grep default\\. | while read f; do 
  mv "$f" "$(dirname $(dirname $f))/$(echo $(basename $f) | sed s/default/$(basename $(dirname $f))/)"
done

find ~/static/ -type f | grep -v default/ | grep \\.js | while read f; do
  echo "$(node -e "var fs = require ('fs'); var compiler = require ('surplus/compiler'); console .log (compiler .compile (fs .readFileSync ('$f') .toString (), { sourcemap: 'append' }));")" > "$f"
done

find ~/static/ -type f | grep \\.scss | while read f; do
  pnpx sass "$f" "${f%.*}.css"
  rm "$f"
done


pnpx browserify ~/static/default/default.js -o ~/static/default.bundle.js
echo ';' >> ~/static/default.js
cat ~/static/default.bundle.js >> ~/static/default.js
rm ~/static/default/default.js
rm ~/static/default.bundle.js

#touch ~/static/default.js
find ~/static/ -type f | grep default/ | grep \\.js | grep -v default\\.js | while read f; do
  echo ';' >> ~/static/default.js
  cat "$f" >> ~/static/default.js
  rm "$f"
done
find ~/static/ -type f | grep default/ | grep default\\. |  while read f; do
  mv "$f" ~/static/
done

find ~/static/ -type d -empty -delete

find ~/static/ -type f | grep \\.js | while read f; do
  pnpx -p babel-cli babel ~/static/default.bundle.js -o ~/static/default.js