npm install --save-dev cross-env

npm install -g cross-env

change in package.json

"scripts": { "start": "cross-env PORT=5000 react-scripts start", // other scripts... }

npx cross-env PORT=5000 react-scripts start

set PORT=5000

npm start

Note : i used hard code data bcz, api key is expiring that's why i focus on react not on api