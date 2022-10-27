let http = require('http');
const fs = require('fs');

const port = process.env.PORT || 3000;

http.createServer(function (req, res) {
    // reply();
    retweet();
    like();
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello I am Bot');
}).listen(port);

let twit = require('twit');

/* Getting keys from env values */

let config = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET

}

/* Getting keys and tokens if they are stored in local config file   */
/* let config = require('./config') */

let Twitter = new twit(config);
let joke;
/* Tags to retweet or like are to be filled in the tags array */
let tagsArray = [];

/* This function replies to mentioned tweet */
function reply(){

    /* Getting joke */
    let request = require('request');

    let options = {
        url: 'https://official-joke-api.appspot.com/jokes/programming/random',
        method: 'GET'
    }
    request(options, (err, response, body) => {
        if(!err && response.statusCode == 200) {
            joke = JSON.parse(body)
            joke =  `${joke[0].setup} ${joke[0].punchline}`
            console.log(joke)
        }
    });
    let params = {
            /* Here comes the your @username and eveytime itll be mentioned it will reply to it */
            q: '', 
            result_type: 'recent',
            lang: 'en'    
    }

    Twitter.get('search/tweets', params, function(err, data) {

        if (!err) {
          /* Get id of tweet to reply */
            let tweetId = data.statuses[0].id_str;
            let check = 0;

            /* Checking if already replied to tweet or not */
            fs.readFile('./repliedId.json', function (err, OldData) {
                let dataArray = JSON.parse(OldData);
                for(const element of dataArray){
                    if(tweetId === element.tweetId){
                        check = 1;
                        break;
                    }
                }
                if(check === 1){
                    console.log("already replied");
                }
                else{
                    /* Replying happens here */
                    let x = data.statuses[0].user.screen_name;
                    Twitter.post('statuses/update', { in_reply_to_status_id:tweetId, status:"@" + x + " @" + x + " " + joke}, function(err, response) {
                        if (response) {
                            console.log('Replied' + tweetId);
                            let obj = {
                                tweetId : tweetId
                            }
                            dataArray.push(obj);
                            console.log("here " + JSON.stringify(dataArray));
                            fs.writeFile("./repliedId.json", JSON.stringify(dataArray), function(err){
                              if (err) throw err;
                              console.log('The id was sucessfully appened to file ' + tweetId);
                            });
                        }
                        /* If Error while tweeting */
                        if (err) {
                            console.log('Something went wrong while Replying...'+ params.q);
                        }
                    });

                    /* Liking happens here */
                    Twitter.post('favorites/create', { id: tweetId }, function(err, response) {
                        if (response) {
                        console.log('Liked tweet from' + params.q);
                        }
                        /* If Error while liking */
                        if (err) {
                        console.log('Something went wrong while Liking...'+ params.q +' Already Liked maybe...');
                        }
                    });
                }
            });
        }
        /* If some error happens */
        else {
          console.log('Some error happened');
        }
    });
}

/* This function retweets a random tweet from tagsArray  */
let retweet = function() {
    let i;
    let params;
    i = Math.floor(Math.random() * (tagsArray.length - 1)) + 1
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
    let params;
    i = Math.floor(Math.random() * (tagsArray.length - 1)) + 1;
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