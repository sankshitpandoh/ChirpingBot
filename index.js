let http = require('http');
const port = process.env.PORT || 3000;
http.createServer(function (req, res) {
    retweet()
    reply()
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello I am Bot Pandoh, you should not be here. Are you lost? <a href="https://twitter.com/BotPandoh">Click here</a> to see me working live ');
}).listen(port);

let twit = require('twit');

// Getting keys from env values
let config = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET

}
// let config = require('./config')

let Twitter = new twit(config);
let lastId
let joke

function reply(){
    //Getting joke
    let request = require('request');

    let options = {
        url: 'https://official-joke-api.appspot.com/jokes/programming/random',
        method: 'GET'
    }
    request(options, (err, response, body) => {
        if(!err && response.statusCode == 200)
            joke = JSON.parse(body)
            joke =  joke[0].setup + " " +joke[0].punchline
            console.log(joke)
        });
    let params = {
        q: '@BotPandoh',
        result_type: 'recent',
        lang: 'en'    
        } 
    Twitter.get('search/tweets', params, function(err, data) {

        if (!err) {
          // Get's id of tweet to reply
            var tweetId = data.statuses[0].id_str;
            //Checks if already replied or not
            if(tweetId == lastId ){
                console.log("already replied")
            }
            else{
                // Replying happens here
                let x = data.statuses[0].user.screen_name
                Twitter.post('statuses/update', {
                in_reply_to_status_id:tweetId,
                status:"@" + x + " @" + x + " " + joke
            }, function(err, response) {
                if (response) {
                    console.log('Replied' + tweetId);
                    lastId = tweetId
                }
                //If Error while tweeting
                if (err) {
                    console.log('Something went wrong while Replying...'+ params.q);
                }
            });
            // Liking happens here
            Twitter.post('favorites/create', {
                id: tweetId
            }, function(err, response) {
                if (response) {
                    console.log('Liked tweet from' + params.q);
                }
                //If Error while liking
                if (err) {
                    console.log('Something went wrong while Liking...'+ params.q +' Already Liked maybe...');
                }
            });
            }

        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...' + params.q);
        }
    });
}

let retweet = function() {
    let i 
    let parms
    i = Math.floor(Math.random() * 5) + 1
    if(i == 0){
        params = {
            q: '#fullstack',
            result_type: 'recent',
            lang: 'en'    
        } 
    }
    else if(i == 1){
        params = {
        q: '#100DaysOfCode',
        result_type: 'recent',
        lang: 'en'    
        } 
    }
    else if(i == 2){
        params = {
            q: '#javascript',
            result_type: 'recent',
            lang: 'en'    
        } 
    }
    else if(i == 3){
        params = {
            q: '#programming',
            result_type: 'recent',
            lang: 'en'    
        } 
    }
    else if(i == 4){
        params = {
            q: '#coding',
            result_type: 'recent',
            lang: 'en'    
        } 
    }
    else {
        params = {
            q: '#webdevelopment',
            result_type: 'recent',
            lang: 'en'    
        } 
    }

    Twitter.get('search/tweets', params, function(err, data) {

          if (!err) {
            // Get's id of tweet to retweet
              var retweetId = data.statuses[0].id_str;
              // Retweeting happens here
              Twitter.post('statuses/retweet/:id', {
                  id: retweetId
              }, function(err, response) {
                  if (response) {
                      console.log('Retweeted!!!' + params.q);
                      like()
                  }
                  //If Error while tweeting
                  if (err) {
                      console.log('Something went wrong while RETWEETING...'+ params.q +' Duplication maybe...');
                  }
              });
          }
          // if unable to Search a tweet
          else {
            console.log('Something went wrong while SEARCHING...' + params.q);
          }
      });
  }

let like = function(){
    let i 
    let parms
    i = Math.floor(Math.random() * 5) + 1
    if(i == 0){
        params = {
            q: '#fullstack',
            result_type: 'recent',
            lang: 'en'    
        } 
    }
    else if(i == 1){
        params = {
        q: '#100DaysOfCode',
        result_type: 'recent',
        lang: 'en'    
        } 
    }
    else if(i == 2){
        params = {
            q: '#javascript',
            result_type: 'recent',
            lang: 'en'    
        } 
    }
    else if(i == 3){
        params = {
            q: '#programming',
            result_type: 'recent',
            lang: 'en'    
        } 
    }
    else if(i == 4){
        params = {
            q: '#coding',
            result_type: 'recent',
            lang: 'en'    
        } 
    }
    else {
        params = {
            q: '#webdevelopment',
            result_type: 'recent',
            lang: 'en'    
        } 
    }
    Twitter.get('search/tweets', params, function(err, data) {

        if (!err) {
          // Get's id of tweet to like
            let favId = data.statuses[0].id_str;
            // Liking happens here
            Twitter.post('favorites/create', {
                id: favId
            }, function(err, response) {
                if (response) {
                    console.log('Liked tweet from tag' + params.q);
                }
                //If Error while liking
                if (err) {
                    console.log('Something went wrong while Liking...'+ params.q +' Already Liked maybe...');
                }
            });
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...' + params.q);
        }
    });
}