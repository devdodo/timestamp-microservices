// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// @desc   GET current api timestamp
// @route /api/timestamp
/*app.get("/api/timestamp", (req, res) => {
  const jsonObject = {
      unix: Date.now(),
      utc: Date()
    };
  
  res.json(jsonObject);
});

// My api timestamp endpoint
app.get("/api/timestamp/:date_string", (req, res) => {
  const timeStamp = req.params.date_string;
  console.log(timeStamp);
  
  var jsonObject;
  var regExp = new RegExp(/\d{16}/);
  
  if(regExp.test(timeStamp)){
    var date = new Date(parseInt(timeStamp));
    
    jsonObject = {
      unix: timeStamp,
      utc: date.toUTCString()
    };
    
    res.json(jsonObject);
  }
  
  
  var date = new Date(timeStamp);
  
  if(date.toString() === "Invalid Date"){
    res.json({"error": "Invalid Date"});
  }else{
    
    jsonObject = {
      unix: date.valueOf(),
      utc: date.toUTCString()
    };
    
    res.json(jsonObject);    
  }  
  
  
});

*/

/*
app.get("/api/timestamp/", (req, res) => {
  const date = new Date();
  res.json({ unix: date.valueOf(), utc: date.toUTCString() });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  let dateString = req.params.date_string

  //A 4 digit number is a valid ISO-8601 for the beginning of that year
  //5 digits or more must be a unix time, until we reach a year 10,000 problem
  if (/\d{5,}/.test(dateString)) {
    let dateInt = parseInt(dateString);
    //Date regards numbers as unix timestamps, strings are processed differently
    res.json({ unix: dateString, utc: new Date(dateInt).toUTCString() });
  } else {
    let dateObject = new Date(dateString);

    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
  }
});*/

app.get("/api/timestamp/:date_string?", (req, res) => {
  let s = req.params.date_string || 0;
  let dt;
  let unix;
  let utc;
  
  if(s.length >= 10){
    s = parseInt(s);
    dt = new Date(s);
    
    unix = dt.getTime();
    utc = new Date(s).toUTCString();
    res.json({unix: unix, utc: utc});
    
  }else if(s == 0){
    
    dt = new Date();
    unix = dt.getTime();
    utc = dt.toUTCString();
    res.json({unix: unix, utc: utc});
    
  }else{
    // Other date format
    // dt = new Date(Date.parse(s));
    // unix = dt.getTime();
    // utc = dt.toUTCString();
    
    let dateObject = new Date(s);

    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
  }
});

//1479663089000

/*
app.get('/api/timestamp/:date_string?', (req, res) => {
  let dateString = req.params.date_string;
  
  if(typeof(dateString) === "string"){
    // Conver String to integer
    const dateInt = parseInt(dateString);
    
    // Regular expression for checking numbers
    const regExp = new RegExp(/^[0-9]+$/);
    
    // Test if string contains non numeric characters
    if(regExp.test(dateString)){
            
      res.json({unix: new Date(dateInt), utc: new Date(dateInt).toUTCString()});
      
    }else{
      // executes if non numeric characters are in the input
      const jsonObject = {
        error: "Invalid Date"
      }
      
      res.json(jsonObject);
    }
    
  }else{
    // executes if no timestamp is inputed
    res.json({unix: Date.valueOf(), utc: new Date().toUTCString()});
  }
});

*/

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
