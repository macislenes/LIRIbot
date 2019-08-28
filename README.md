 ## What is LIRIbot and a quick overview:

LIRIbot is a Language Interpretation and Recognition Interface that is used to hep with returning information on songs, movies and concert information on bands that are touring. It helps condense a lot of information into one easy to use command line application. This smart bot uses two different kind of calls to return information. I used Axios which is a promise based HTTP client for node.js as well as the spotify NPM (package manager JavaScript). 
 
## The action node is looking out for:
```”concert-this”``` 
The band you want to see tour dates and locations for

```"spotify-this-song"```
Search for a song title and return the artist(s), album etc

```"movie-this"```
Look up a movie you would like to know ratings, actors, plot etc

```"do-what-it-says"```
When you run this it will run the file radom.txt 
 
## Looking at the code:
* liri.js: all the main functionality of the app. The entry point for the application
* .gitignore: file which instructs git to ignore the files contained in it
* key.js:  requires information from our .env file in order to complete our Spotify call
* .env: not be available to the public; private Spotify keys
* package.json package-lock.jason: NPM information and dependencies

 
## Unpacking liri.js:
The application is divided into three sections
* First Section: Requiring our modules and identifying the "operation" and "searchTerm"
    * "operation" ==> the action specified in the command line
    * "searchTerm" ==> what we are searching
* Second Section: There are two functions called for three of the operations one to make our API call or NPM the other to parse the response
* Third Section: Where the code is listening for our action and decides which function to call
 
## Start to Finish:
1. Searching for Tour Dates:
    ```node liri.js concert-this "Snoop Dogg"```
    What to expect:
![concert-this](images/spotify.png)
2. Song Searc:
    ```node liri.js spotify-this-song "I want it that way"```
    What to expect:
![spotify-this-song](images/snoopdogg.png)
3. Looking for a movie:
    ```node liri.js movie-this "Princess Bride" ```
    What to expect: 
![movie-this](images/princessbride.png)
4. Do what it says:
    ```node liri.js do-what-it-says```
    What to expect: 
![do-what-it-says](images/backstreetboys.png)


Designed and developed by: Maci Slenes
