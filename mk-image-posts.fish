#!/usr/bin/env fish

## ensure it's complete and correct using echo
## missing date and updated fields
## as well as external refs
## copy page.md template perhaps
## and use kakoune to edit?

## pass in image files as arguments
## using `./mk-image-post.fish (find)`

set images $argv

set date (date +"%F %H:%M:%S")

set template "+++
title = \"{{title}}\"
date = $date
  # change updated when updated
updated = $date
[extra]
cover-image = \"{{image-path}}\"
+++"
# echo $template

for image in $images
  set title (basename -s '.png' $image)
  # strip dates
  set title (echo $title | sed -E "s/-[0-9]{4}-[0-9]{2}-[0-9]{2}//")
  # strip hyphens
  set title (echo $title | tr - " ")
  # convert to title case
  set title (echo $title | sed -E "s/[[:alnum:]_'-]+/\u&/g")
  echo
  # echo creating entry for $image
  echo $template |
    sed "s/{{title}}/$title/ ; s:{{image-path}}:$image:"
end
