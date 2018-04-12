require("dotenv").config();

const Twitter = require("twitter");
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");

const client = new Twitter(keys.twitter);
const spotify = new Spotify(keys.spotify);


const command = process.argv[2];

switch (command) {
    case "my-tweets":
        showMyTweets();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
}

function showMyTweets() {

    let params = {
        screen_name: 'AhsokaT38777354',
        count: "20" 
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            tweets.forEach(function(item) {
                console.log(`Created: ${item.created_at} Tweet: ${item.text}`);
            })
        } else {
            console.log(error);
        }
    });

}

function spotifyThisSong() {

}

function movieThis() {

}

function doWhatItSays() {

}