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
- Run npm install <br />
- Run Node index.js

# Supporting Me
Thanks for using this project!
Please star this project, share it on Social Media.
If you want to hire me for contract / freelance work, you can do so! [Get in touch with me](https://www.linkedin.com/in/sankshit-pandoh/)