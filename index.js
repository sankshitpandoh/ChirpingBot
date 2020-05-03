let http = require('http');
const port = process.env.PORT || 3000;
// require('heroku-self-ping').default("https://chirping-bot.herokuapp.com/");
http.createServer(function (req, res) {
    // function start(counter){
    //     if(counter < 10){
    //       setTimeout(function(){
    //         counter++;
    //         retweet()
    //         start(counter);
    //       }, 1000);
    //     }
    //   }
    //   start(0);
    retweet()
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('I am a bot, why are you here?');
}).listen(port);

let twit = require('twit');
// let config = require('./config')
let config = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
}

let Twitter = new twit(config);
let retweet = function() {
    let params = {
      q: '#100DaysOfCode',
      result_type: 'recent',
      lang: 'en'    
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
                      console.log('Retweeted!!!');
                  }
                  //If Error while tweeting
                  if (err) {
                      console.log('Something went wrong while RETWEETING... Duplication maybe...');
                  }
              });
          }
          // if unable to Search a tweet
          else {
            console.log('Something went wrong while SEARCHING...');
          }
      });
  }