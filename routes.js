
// This defines three routes that our API is going to use.
var routes = function(app) {
  
app.get("/", function(req, res) {
  // res.send("<h1>REST API</h1><p>Oh, hi! There's not much to see here - view the code instead</p><script src=\"https://button.glitch.me/button.js\" data-style=\"glitch\"></script><div class=\"glitchButton\" style=\"position:fixed;top:20px;right:20px;\"></div>");
  
  // log a ping was received
  console.log(Date.now() + " Ping Received");
  res.sendStatus(200);
});  


// A route for POST requests sent to `/update`. Imagine we have an app and we want an API call for passing
// data related to an account. In this route we're checking that the POST request contains two parameters,
// `username` and `data`. If it does have them, then we're logging the contents to the console and just
// sending back the contents of the request. In a real app, this is where you could include a function
// call to populate a database with them. Otherwise, if one or more parameters are missing, we log what
// we were sent to the console and then send back an error message.

// Testing this is slightly trickier than just viewing the output in the browser. But there are a couple of ways.
// One way is to send a mock POST request using Curl from the terminal. Copy and paste the following into your terminal and hit enter:
// `curl -H "Content-Type: application/json" -X POST -d '{"username":"test","data":"1234"}' http://rest-api.glitch.me/update`
// This sends a JSON object with the username 'test' and data '1234' to the '/update' API endpoint.
// If you have the logs open in Glitch, you'll see an update with the line 'Received POST: {"username":"test","data":"1234"}'.
// Try editing the JSON object to use different data, and with empty or missing parameters too - you should see
// the 'Received incomplete POST' message in the logs.

// If you don't have Curl or access to the terminal, then you can also use a browser plugin, like [Servistate](http://www.servistate.com)
// for Chrome, with which you can also send test GET and POST requests. Both of these techniques are just simulating a request sent
// by an app or form in a real application.
app.post("/update", function(req, res) {
  
  if(!req.body.username || !req.body.data) {
    console.log("Received incomplete POST: "+JSON.stringify(req.body));
    return res.send({"status": "error", "message": "missing parameter(s)"});
  } 
  else {
    console.log("Received POST: "+JSON.stringify(req.body));
    return res.send(req.body);
  }

});
  
  // A GET request handler for `/update`. Similar to the POST handler, it just validates the submitted data. In this case,
  // it separately checks whether there's a username or data parameter, giving a specific error if either is missing.
  // Lastly, for the scenario where a username is provided, it checks whether it matches the username value in the `dummyData`
  // JSON object. This is simulating the situation in a real app where you might first check that the username exists in your
  // database before trying to store data for that user.

  // You can test this one in the browser - go to https://jrest.glitch.me/update?username=testUser&data=1234
  // In the Glitch logs, you'll see 'Received GET' and the values for username and data that we passed into the URL displayed.
  // In the browser window itself, you'll also see the JSON object with username and data values displayed too. Try changing or
  // omitting the values and you'll see the appropriate message or error.
  app.get("/update", function(req, res) {
    var dummyData = {
      "username": "testUser",
      "data": "amazon_order_id = mws.1231oi4u.nbv54"
    };

    // console.log("Received GET: "+JSON.stringify(req.body));

    if(!req.query.username) {
      return res.send({"status": "error", "message": "no username"});
    } 

    else if(!req.query.data) {
      return res.send({"status": "error", "message": "no data"});
    } 

    else if(req.query.username != dummyData.username) {
      return res.send({"status": "error", "message": "username does not match"});
    }

    else {
      return res.send(dummyData);
    }

  });  
  
  app.get("/simple", function(request, response) {
    response.send("<h1>You Request is successful ^_^</h2>"); 
  }); 
  
}; // END OF: var routes = function(app) {}

// send code back to server.js
module.exports = routes;