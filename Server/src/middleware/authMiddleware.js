var jwt = require('jsonwebtoken')
var asyncHandler =require('express-async-handler')
var mysql = require('mysql2');

// make connections for MySql and import all necessary dependencies
// Setup Connection
var con = mysql.createConnection({
    host: "mysql",
    user: "root",
    password: "12345",
    database: "shedapp",
    insecureAuth : true
});

// Log connection status to console.
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the database!");
});

// this protect function checks whether a bearer token named authorization
// has been passed or not.
const protect = asyncHandler(async (req, res, next) => {

    let token 

    // if the the token starts with Bearer
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        
        try {
            // split at the first space
            token = req.headers.authorization.split(' ')[1]
            
            // decode with secret
            const decoded = jwt.verify(token, 'shedApp2021')

            

            /*
            * sql query to find the user by decoded.id if you want to do
            * something with the logged in user or check their type to make
            * separate protected routes
            * Don't pull password from db
            */

            // req.user = con.query(
            //     "SELECT * FROM users WHERE id = ?;",
            //     decoded.id,
            //     (err) => {
            //         if (err) {
            //         res.send({ err: err });
            //         }  
            //     }
            // )
            //console.log(req.user); 

            // go to the next middleware
            next()

        } catch (error) {

            console.error(error)
            res.status(401)

            throw new Error('Not authorized, token failed')
        }
    
    }

    if(!token) {

        res.status(401)
        throw new Error('Not authorized, no token')
    }

})

module.exports= { protect }