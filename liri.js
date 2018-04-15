require("dotenv").config();

const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const keys = require("./keys.js");
const request = require("request");

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
        screen_name: "AhsokaT38777354",
        count: "20"
    };
    client.get('statuses/user_timeline', params,
        function (error, tweets, response) {
            if (!error) {
                tweets.forEach(function (item) {
                    console.log(`\nCreated: ${item.created_at}\n` +
                                `Tweet: ${item.text}\n`
                    );
                })
            } else {
                console.log(error);
            }
        });
}

function spotifyThisSong() {
    const args = process.argv.slice(3);
    let name = args.join(" ");

    if (!name) {
        name = "The Sign";
    }
    spotify.search({ type: 'track', query: name },
        function (error, data) {
            if (!error) {
                let tracks = data.tracks.items;
                tracks.forEach(function (song) {
                    console.log(`\nArtist: ${song.artists[0].name}\n` +
                                `Name: ${song.name}\n` +
                                `Preview: ${song.preview_url}\n` +
                                `Album: ${song.album.name}\n`
                    );
                })
            } else {
                console.log(error);
            }
        });
}

function movieThis() {
    const args = process.argv.slice(3);
    let title = args.join(" ");

    if (!title) {
        title = "Mr. Nobody";
    }

    const queryUrl = `http://www.omdbapi.com/?t=${title}&y=&plot=short&apikey=trilogy`;


    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const movie = JSON.parse(body);
            console.log(`\nTitle: ${movie.Title}\n` +
                        `Release Year: ${movie.Year}\n` +
                        `IMDB Rating: ${movie.Ratings[0].Value}\n` +
                        `Rotten Tomatoes Rating: ${movie.Ratings[1].Value}\n` +
                        `Country: ${movie.Country}\n` +
                        `Language: ${movie.Language}\n` +
                        `Plot: ${movie.Plot}\n` +
                        `Actors: ${movie.Actors}\n`
            );
        }
    });

}

function doWhatItSays() {

}