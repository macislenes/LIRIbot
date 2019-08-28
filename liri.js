//create environment variables that the process can use from the .env file
require("dotenv").config();

var axios = require('axios');
var Spotify = require('node-spotify-api');
// include the module which has the keys that we will retrieve from the environment
var keys = require('./keys.js');
// create an instance of Spotify which takes the exported variable from the keys module
var spotifyApi = new Spotify(keys.spotify);
var moment = require('moment');
// creating a variable to use the 'fs' module
var fs = require('fs');

var operation = process.argv[2];
var searchTerm = process.argv[3];

function getMovieRating(ratings, source){
    for(var i = 0; i < ratings.length; i++){
        if(ratings[i].Source == source){
            return ratings[i].Value
        };
    }
};

function parseMovieResponse(movieResponse){

    console.log(           
        "\nMovie Title: " + movieResponse.Title +
        "\nRelease Year: " + movieResponse.Year + 
        "\nIMDB Rating: " + getMovieRating(movieResponse.Ratings, 'Internet Movie Database') +
        "\nRotten Tomatoes Rating: " + getMovieRating(movieResponse.Ratings, 'Rotten Tomatoes') +
        "\nCountry: " + movieResponse.Country +
        "\nLanguage: " + movieResponse.Language +
        "\nPlot: " + movieResponse.Plot +
        "\nActors: " + movieResponse.Actors 
    );

    console.log("---------------");
};

function getMovieDetails(){
    searchTerm = (searchTerm ? searchTerm : "Mr. Nobody");

    var omdbApiURL = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";
    axios
    .get(omdbApiURL)
    .then(function(response) {
        if(response.data.Error == 'Movie not found!' ){
            console.log(response.data.Error);
        }else{
            parseMovieResponse(response.data);
            // console.log(response.data)
        };
    })
    .catch(function(error) {
    if (error.response) {

        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {

        console.log(error.request);
    } else {

        console.log("Error", error.message);
    }
    console.log(error.config);
    });
};


function parseBandResponse(bandResponse){
    for(var i = 0; i < bandResponse.length; i++){
        var currentShow = bandResponse[i];
        var displayConcertTime = moment(currentShow.datetime).format('MMMM Do YYYY, h:mm a')
        console.log(
           "\nVenue Name: " + currentShow.venue.name +
           " \nVenue Location: " + currentShow.venue.city + ", " + currentShow.venue.country +
           " \nDate of Concert: " + displayConcertTime
        );
    }
    console.log("---------------");
};

function getBandDetails(){
    var bandsInTownApiURL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
    axios
    .get(bandsInTownApiURL)
    .then(function(response) {
    parseBandResponse(response.data);
    })
    .catch(function(error) {
    if (error.response) {

        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {

        console.log(error.request);
    } else {

        console.log("Error", error.message);
    }
    console.log(error.config);
    });

};

function parseSpotifyResponse(spotifyResponseTracks){
    
    for(var i = 0; i < spotifyResponseTracks.length; i++){
        var currentTrack = spotifyResponseTracks[i];
        var trackArtists = currentTrack.artists;
        var artists = ""; 

        var previewUrl = (currentTrack.preview_url ? currentTrack.preview_url : "(No URL Available)");
    
        for(var j = 0; j < trackArtists.length; j++){
            artists +=  trackArtists[j].name + ", ";
        };
        console.log(
            "\nArtist(s): " + artists.substring(0, artists.length - 2) +
            "\nSong Name: " + currentTrack.name +
            "\nSong Preview URL: " + previewUrl +
            "\nAlbum: " + currentTrack.album.name
        );
        
    };
};

function spotifySongSearch(){

    searchTerm = (searchTerm ? searchTerm : "The Sign")

    spotifyApi
        .search({ type: 'track', query: searchTerm })
        .then(function(response) {
            parseSpotifyResponse(response.tracks.items)

        })
        .catch(function(err) {
            console.log(err);
        });

};


if(operation == 'do-what-it-says'){
    //read the file and store it in a variable
    var contents = fs.readFileSync('random.txt', 'utf8');
    var commandParts = contents.split(',');
    operation = commandParts[0];
    //remove unnecessary quotes
    searchTerm = commandParts[1].replace(/"/g,'');
}

switch(operation){

case "concert-this":
    getBandDetails();
    break;

case "spotify-this-song":
    spotifySongSearch();
    break;

case "movie-this": 
    getMovieDetails();
    break;
};

