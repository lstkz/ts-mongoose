rm -rf ./dist
mkdir pre_dist
mkdir dist
mkdir dist/es
yarn run tsc --declaration true --module esnext --outDir "./pre_dist/es"
yarn run tsc --declaration true --module commonjs --outDir "./pre_dist"
mv ./pre_dist/es/src/* ./dist/es
mv ./pre_dist/src/* ./dist
rm -rf ./pre_dist
cp package.json ./dist/package.json
cp README.md ./dist/README.md
