# This Project is divided into three branches
- Master Branch

    Here the general code for the bot is present
- botPandoh Branch 

    [![Heroku](http://heroku-badges.herokuapp.com/?app=heroku-badges&root=products-e2e.html)](https://chirping-bot.herokuapp.com/)
    
    Here the code is configured for [@BotPandoh](https://twitter.com/BotPandoh)
    
- MusicSmokinBot Branch

    [![Heroku](http://heroku-badges.herokuapp.com/?app=heroku-badges&root=products-e2e.html)](https://smokin-loud-music.herokuapp.com/)

    Here the code is configured for [@MusicSmokinBot](https://twitter.com/MusicSmokinBot)
# A Twitter Retweeting bot
A simple twitter bot written in Node which retweets on the basis of hashtags as a query and continues to do so after a certain period of time interval.

# Keys and access tokens
This bot uses 4 pair of keys to get specific permissions from Twitter API.
- Consumer Key 
- Consumer Secret
- Access token
- Access token secret
    
They are stored on the server in the form of Config vars.
# Instructions to run locally
- Clone this repo 
- Follow this [link](https://apps.twitter.com/app/new) to create a new twitter application
- After creating the application, look for ‘Keys and Access Tokens' and copy all above mentioned keys.
- Create a config.js file inside the project's directory and add :

```
    module.exports = {
        consumer_key: 'Your consumer key here',  
        consumer_secret: 'Your consumer secret key here',
        access_token: 'Your access token here',  
        access_token_secret: 'Your access token secret here'
        }
```
    
Inside index.js replace 

```
    let config = {
        ...
        ...
    }
```
with
```
    let config = require('./config')
```
- To install all dependecies , Run  
```
npm install
``` 
- To start, Run  
```
npm start
```

# Supporting Me
Thanks for using this project!
Please star this project, share it on Social Media.
If you want to hire me for contract / freelance work, you can do so! [Get in touch with me](https://www.linkedin.com/in/sankshit-pandoh/)
