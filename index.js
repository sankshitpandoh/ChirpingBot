const Twit = require('twit');
const T = new Twit({
    consumer_key: process.env.APPLICATION_PDPquJbBKZ36pGln7qRAxwZwD,
    consumer_secret: process.env.APPLICATION_8bouUiQtrZ4EybKaVqEBFGwUy9pU636rCfrdgYfFj1QScCMg3i,
    access_token: process.env.1256615028221861891-Fl9uXpqEEGjvTuHwwzBzbZ5yruCJ2y,
    access_token_secret: process.env.tiHuxrySqxqIgxM6Oq8SO2Isfebg2awmkKB4YoTHFLGTe
});
const stream = T.stream('statuses/filter', {track: '#100DaysOfCode'});

// use this to log errors from requests
function responseCallback (err, data, response) {
    console.log(err);
   }
   
   // event handler
   stream.on('tweet', tweet => {
      // retweet
     T.post('statuses/retweet/:id', {id: tweet.id_str}, responseCallback);
     // like
     T.post('favorites/create', {id: tweet.id_str}, responseCallback);
   });