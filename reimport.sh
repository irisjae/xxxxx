imports="var $(find ~/src/ -type f | grep default/ | grep \\.js | xargs -I {} sed '1,/^[[:space:]]*window \.stuff.*$/d' {} | sed 's/ }/,\n/' | sed 's/^[[:space:]]*//' | sed -z 's/\(.*\),/{ \1\n}/') = window .stuff"

find ~/src -mindepth 1 -maxdepth 1 | grep -v default | xargs -I {} find {} -mindepth 1 | grep default\.js | xargs -I {} echo "$imports$(sed '1,/^} = window \.stuff$/d' {})" 