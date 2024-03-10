# weatherApp
A basic weather app, drawing from public APIs

Before the API to look up the user's location will work, the .env file needs updated.

If you're running a clone locally, you'll need to make a project with google cloud console and get an API key, then create a `.env` file in the root directory, and update the variable like this:

`REACT_APP_GMAPAPIKEY = "your-key-here"`

The public-facing version of my site was deployed using Netlify, which allows an environment variable ot be set up through their UI.


I started with:
Some knowledge of Google Cloud Console and an existing account
Experience with React/Bootstrap
Experience using APIs, but not these specific ones
Experience setting up CI/CD website deployment using Netlify


# Activity log

Day 1: 
Decided on a weather app, and thought about basic look of the site.
Researched and decide on API to retrieve weather.
Set up React.
Coding basic display, showing successful API use by displaying a list of upcoming weather patterns.
Spent some time playing with the basic look of the site now that data was being pulled in.
Site displays location latitude and longitude, and list of upcoming weather status.

Day 2: 
Decided to use Bootstrap for styling.
Installed bootstrap.
Changed display to only show one block of time instead of a list.
Added conditionally rendered previous/next buttons to move forward/backward in what time block displayed.
Decided I wanted the location city, state, and zip to show instead of coordinates.
Researched reverse geolocation APIs, and decided on Google.
Tested Google's location API using postman until I figured it out.
Updated code to retrieve location information from Google, then display that instead of coordinates.
Deployed to netlify, set up CI/CD. Every push to "main" now updates public site.
Google API key is stored in .env file on local machine, and as an environment variable in netlify.


Possible improvements:
Storing the API key as an environment variable is better than nothing, but from my reading it is not as safe as performing the API request on a back-end instead. If this was a full application that used a secure, premium API then it would be worth it to add the extra layer of obfuscation by running the requests through a back-end, such as a Google Cloud Function. For the purpose of this basic app though, that's beyond the scope and unnecessary.
For an example of a site I made that does use this system, please check out [weeklydire.netlify.app](weeklydire.netlify.app)