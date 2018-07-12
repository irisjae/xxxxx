imports="var $(find ~/src/ -type f | grep default/ | grep \\.js | xargs -I {} sed '1,/^[[:space:]]*window \.stuff.*$/d' {} | sed 's/ }/,\n/' | sed 's/^[[:space:]]*//' | sed -z 's/\(.*\),/{ \1 }/') = window .stuff"

