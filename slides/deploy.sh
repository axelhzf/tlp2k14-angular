rm -rf out
grunt copy
cd out
git init
git add --all
git commit -m "deploy"
git push --force https://github.com/axelhzf/tlp2k14-angular.git master:gh-pages