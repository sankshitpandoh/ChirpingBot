let http = require('http');
const fs = require('fs');

const port = process.env.PORT || 3000;

http.createServer(function (req, res) {
    // reply();
    retweet();
    like();
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello I am Bot Pandoh, you should not be here. Are you lost? <a href="https://twitter.com/BotPandoh">Click here</a> to see me working live ');
}).listen(port);

let twit = require('twit');

/* Getting keys from env values for @MusicSmokinBot */

let config = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET

}

/* Getting keys and tokens if they are stored in local config file   */
/* let config = require('./config') */

let Twitter = new twit(config);
let tagsArray = ['#hiphop', '#rap', '#music', '#hiphopmusic', '#hiphopculture', '#rapartists', '#hop', '#drake', '#future' , '#ynwmelly' , '#weeknd', '#liluzivert' , '#xxlfreshmen' ,'#JuiceWrld' , '#Jaden' , '#LilTjay' , '#TuPac' , '#PoloG' , "#MetroBoomin" , '#21Savage' , '#soundcloud' , '#hiphopnation'];

/* This function retweets a random tweet from tagsArray  */
let retweet = function() {
    let i 
    let parms
    i = Math.floor(Math.random() * 21) + 1
    params = {
        q: tagsArray[i],
        result_type: 'recent',
        lang: 'en'    
    } 

    Twitter.get('search/tweets', params, function(err, data) {

          if (!err) {
            // Get's id of tweet to retweet
              var retweetId = data.statuses[0].id_str;
              // Retweeting happens here
              Twitter.post('statuses/retweet/:id', { id: retweetId }, function(err, response) {
                  if (response) {
                      console.log('Retweeted!!!' + params.q);
                  }
                  /* If Error while tweeting */
                  if (err) {
                      console.log('Something went wrong while RETWEETING...'+ params.q +' Duplication maybe...');
                  }
              });
          }
          /* If unable to Search tweet */
          else {
            console.log('Something went wrong while SEARCHING...' + params.q);
          }
      });
  }

/* This function likes a random tweet from tagsArray  */
let like = function(){
    let i; 
    let parms;
    i = Math.floor(Math.random() * 21) + 1;
    params = {
        q: tagsArray[i],
        result_type: 'recent',
        lang: 'en'    
    } 
    Twitter.get('search/tweets', params, function(err, data) {

        if (!err) {
          // Get's id of tweet to like
            let favId = data.statuses[0].id_str;
            // Liking happens here
            Twitter.post('favorites/create', { id: favId }, function(err, response) {
                if (response) {
                    console.log('Liked tweet from tag' + params.q);
                }
                /* If Error while liking */
                if (err) {
                    console.log('Something went wrong while Liking...'+ params.q +' Already Liked maybe...');
                }
            });
        }
        /* If unable to Search tweet */
        else {
          console.log('Something went wrong while SEARCHING...' + params.q);
        }
    });
}