# bank-kata
Banking application and api, which can be used by users to code an account linked to it

## Run locally
You can start the server and the client independently
`npm start` on `bank-kata` and `bank-kata/react-ui`
or using the npm scripts 
```
npm run dev
```

## Run on heroku
You have to add the remote git url using the `heroku cli`
```
heroku git:remote -a bank-kata
```
When the master branch is ready to be deployed
```
git push heroku master
```