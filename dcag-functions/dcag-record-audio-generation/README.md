
# DCAG User Registration

## Setup
- `npm install`
- update the names of locations in data.js in current folder

## Run
`npm start`

## Add user
`curl -X POST -H "Content-Type: application/json" -d '{"phoneNumber":"+911234567890"}' http://localhost:3000/createUser`
