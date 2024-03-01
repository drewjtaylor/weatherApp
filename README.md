# weatherApp
A basic weather app, drawing from public APIs

Before the API to look up the user's location will work, the .env file needs updated.

If you're running a clone locally, you'll need to make a project with google cloud console and get an API key, then create and update the variable in the `src/.env` file like this:

`GMAPAPIKEY = "your-key-here"`

The public-facing version of my site was deployed using Netlify, which allows an environment variable ot be set up through their UI.



Deployed to netlify
Constant updates whenever "Main" is updated in github
API key hidden in environment variable