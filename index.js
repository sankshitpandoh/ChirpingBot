let http = require('http');
const fs = require('fs');

let request = require('request');

const port = process.env.PORT || 5000;

http.createServer(function (req, res) {
    initiateTweet()
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello I am Bot Pandoh, you should not be here. Are you lost? <a href="https://twitter.com/BotPandoh">Click here</a> to see me working live ');
}).listen(port);

let twit = require('twit');

let config = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET

}

let apiKey = '104aa872cddd1e64693510ca20f37b34';
let genre = 18;
let snippet = true;
let language = 'en';
let baseURL = 'https://api.musixmatch.com/ws/1.1';

function initiateTweet(){
  let url = `${baseURL}/track.search?format=json&apikey=${apiKey}&s_track_rating=desc`;
  if (genre) { url += `&f_music_genre_id=${genre}`; }
  if (snippet) { url += `&f_has_lyrics=1`; }
  if (language) { url += `&f_lyrics_language=${language}`; }
  
  // console.log(url)
  request.get(url + `&page_size=1`, function(error, response, body) {
    body = JSON.parse(body);
    let available = body.message.header.available;
    // console.log(available);
    if(available > 0){
      var pages = Math.ceil(available / 100);
      var page = Math.floor((Math.random() * pages) + 1);
      request.get(url + `&page_size=100&page=${page}`, function(error, response, body) {
        body = JSON.parse(body);
        var tracks = body.message.body.track_list;
        // console.log(tracks.length)
        if(tracks.length > 0){
          var rnd = Math.floor((Math.random() * tracks.length));
          let trackDetail = tracks[rnd]
          getAlldetails(trackDetail)
        }
      })
    }
  
  })
}

function getAlldetails(x){
  var url = `${baseURL}/track.snippet.get?format=json&apikey=${apiKey}`;
  // console.log(x.track.album_id)
  url += `&artist_id=${x.track.artist_id}`
  url += `&album_id=${x.track.album_id}`
  url += `&track_id=${x.track.track_id}`
  request.get(url, function(error, response, body){
     body = JSON.parse(body);

    let details = {
      lyricSnippet : body.message.body.snippet.snippet_body,
      track : x.track.track_name,
      artist : x.track.artist_name,
      album : x.track.album_name
    }
    console.log(details)
    goTweet(details)
  })
}

function goTweet(details){
  Twitter.post('statuses/update', { status:"This is a test tweet"}, function(err, response) {
    if (response) {
        console.log("Tweeted!" + " " + details);
    }
    /* If Error while tweeting */
    if (err) {
        console.log('Something went wrong while Replying...'+ params.q);
    }
});
}