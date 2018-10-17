
//-- Set up body parser to accept
// JSON and URL encoded values. 

//-- We then include the `routes.js` file, in which we define the API
// end-points and we pass it the `app` variable. 

//-- Lastly, we specify the port to listen to for requests. 
var http = require("http"); 
var express = require("express");
var bodyParser = require("body-parser");


// The Express App:
var app = express();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 
var routes = require("./routes.js")(app);
 
var server = app.listen(3000, function () {
  console.log("Listening on port %s", server.address().port);
});

// app will call itself every 4.5mins
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 270000);