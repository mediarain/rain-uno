jekyll build
DATE=`date +%d-%m-%Y`
git add --all
git commit -m "update score $DATE"
git push origin master
cd ..
