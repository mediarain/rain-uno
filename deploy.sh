rm -rf node_modules dist layer
yarn install --production
mkdir layer
mkdir layer/nodejs
cp -r node_modules/ layer/nodejs/node_modules
NODE_ENV=staging yarn install
yarn tsc
cp -r www/views dist/views/
NODE_ENV=production npx sls deploy --stage production
rm -rf dist layer

npx gulp s3
