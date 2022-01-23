var express = require('express');
var app = express();
var mysql = require('mysql2');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json({ extended: false })
const { url } = require('inspector');
var {protect} = require('./middleware/authMiddleware.js')
var jwt = require('jsonwebtoken')
const cors = require('cors');

app.use(cors())

// Setup Connection
var con = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: "12345",
  database: "shedapp",
  insecureAuth : true
});

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// Log connection status to console.
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the database!");
});

// Route for homepage
app.get('/', function (req, res) {
   res.send('Hello World!');
})

// Get route for users
app.get('/users', protect, function (req, res) {
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  })
})

// Get route for items
app.get('/items', protect, function (req, res) {
  con.query("SELECT * FROM items", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  })
})

// generate a new token function. Replace 'shedApp2021' with your choice of key
const generateToken = (id) => {

  return jwt.sign({ id }, 'shedApp2021', { expiresIn: '30d' });
}

// Get Route for Login
app.post('/login', jsonParser, (req, res) => {
  // Authenticate User
const username = req.body.username
const password = req.body.password

con.query(
  "SELECT * FROM users WHERE username = ?;",
  username,
  (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
        if (password === result[0].password) {
          var user = {
            username: result[0].username, 
            password: result[0].password, 
            firstname: result[0].firstname,
            loggedIn: true,
            token: generateToken(result[0].id)
            };
          res.send(user);
        } else {
          res.send({ message: "Wrong username or password! Please try again!" });
      };
    } else {
      res.send({ message: "User does not exist!" });
    }
  }
)
})

// Add a new user  
app.post('/register', jsonParser, function (req, res) {
  let user = req.body;
  con.query("INSERT INTO users SET ? ", user, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
  });
});

// Add a new item  
app.post('/list', protect, jsonParser, function (req, res) {
  let item = req.body;
  con.query("INSERT INTO items SET ? ", item, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'New Item has been created successfully.' });
  });
});

// Modify a user
app.post('/usermodify', protect, jsonParser, function (req, res) {
  let username = req.body.username;
  let email = req.body.email;
  con.query("UPDATE users SET email = ? WHERE username = ?", [email, username], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'User data has been updated successfully.' });
  });
});

// Return a specific user
app.post('/userdetail', protect, jsonParser, function (req, res) {
  let username = req.body.username;
  con.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      return res.send(result);
    })
})

// Where the server is setup
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at on port number", port)
})
