## Initialize project
mkdir ts-learn-rxjs
cd ts-learn-rxjs
npm init -y
npm install typescript --save-dev
npx tsc --init

npm install rxjs
npm install @types/node --save-dev

npm install axios
npm install @types/axios --save-dev


## Context
- In real world FE side will call the API, then somehow we want to manipulate the data from FE side, we can use the reactive programming for readable code.
- Assuming we have tha data from json files are what we retrived from BE side response data then convert it to observable and performing data processing using rxjs.


## To run application
./run.sh

## Ouput
check the generated log filename build-and-run.log