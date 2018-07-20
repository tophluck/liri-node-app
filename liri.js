require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");

function Spotify(keys) {
    this.id = keys.id;
    this.secret = keys.secret;
}

function Twitter(keys) {
    this.consumerKey = keys.consumer_key;
    this.consumerSecret = keys.consumer_secret;
    this.tokenKey = keys.access_token_key;
    this.tokenSecret = keys.access_token_secret;
}

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var arg = process.argv;

if (arg[2] === "my-tweets") {
    var queryURL = "https://api.twitter.com/1.1/statuses/user_timeline.json?";
    request(queryURL, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("we tried boys");
        }
    })
} else if (arg[2] === "movie-this") {
    movieName = ""
    for (var i = 3; i < arg.length; i++) {
        if (i > 3 && i < arg.length) {
          movieName = movieName + "+" + arg[i];
        }
        else {
          movieName += arg[i];
        }
    }
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(queryURL, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log("Title: " + JSON.parse(body).Title + "\n" + 
          "Release Year: " + JSON.parse(body).Year + "\n" + 
          "IMDB Rating: " + JSON.parse(body).Ratings[1].Value + "\n" +
          "Rotten Tomatos Rating: " + JSON.parse(body).Ratings[2].Value + "\n" +
          "Country: " + JSON.parse(body).Country + "\n" +
          "Plot Summary: " + JSON.parse(body).Plot + "\n" +
          "Main Actors: " + JSON.parse(body).Actors);
        }
      });
      
}