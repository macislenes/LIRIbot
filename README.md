##What is LIRIbot and a quick overview:

LIRIbot is a Language Interpretation and Recognition Interface that is used to hep with returning information on songs, movies and concert information on bands that are touring. It helps condense a lot of information into one easy to use command line application. 
 
##The action node is looking out for:
* ”concert-this”  ==> enter the band you want to see tour dates and locations for
* "spotify-this-song" ==> search for a song title and return the artist(s), album etc
* "movie-this" ==> look up a movie you would like to know ratings, actors, plot etc
* "do-what-it-says" ==> when you run this it will run the file radom.txt 
 
##Looking at the code:
    * liri.js: all the main functionality of the app. The entry point for the application
    * .gitignore: command to ignore the files named when pushing this to github
    * key.js:  requires information from our .env file in order to complete our Spotify call
    *.env: not be available to the public; private Spotify keys
    * package.json package-lock.jason: NPM information and dependencies

 
##Unpacking liri.js:
The application is divided into three sections 
    * First Section: Requiring our modules and identifying the "operation" and "searchTerm"
        * "operation" ==> the action specified in the command line
        * "searchTerm" ==> what we are searching
    * Second Section: There are two functions called for three of the operations one to make our API call or NPM the other to parse the response
    * Third Section: Where the code is listening for our action and decides which function to call
 
##Start to Finish:
    1: Run: node liri.js ==> followed by your "operation" and "searchTerm" (in quotes)
    2: Display: the results will be displayed in the terminal window