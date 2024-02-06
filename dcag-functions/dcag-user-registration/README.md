
# DCAG User Registration

## Setup
- `npm install`
- place credentials file('anz-driver-ops-ritu-f53a0fa0d07e.json') in current folder

## Run
`npm start`

## Add user
```
curl -X POST -H "Content-Type: application/json" -d '{"phoneNumber":"+911234567890"}' http://localhost:3000/createUser
```
## Add multiple users
```
curl -X POST -H "Content-Type: application/json" -d '["+911234567890","+911234567899]}' http://localhost:3000/createUsers
```
