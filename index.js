const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(bodyParser.json());


// ======================
// Session setup
// ======================

app.use(

session({

secret: "fingerprint_customer",

resave: true,

saveUninitialized: true

})

);


// ======================
// JWT Authentication Middleware
// ======================

app.use((req,res,next)=>{

if(req.session.authorization){

let token=

req.session.authorization[
"accessToken"
];

jwt.verify(

token,
"access",

(err,data)=>{

if(err){

return res
.status(403)
.json({

message:
"User not authenticated"

});

}

req.username=
data.username;

next();

});

}

else{

next();

}

});


// ======================
// Import Routes
// ======================

const general =
require("./router/general");

const public_routes =
general.public_users;

const auth_routes =
require("./router/auth_users");


// ======================
// Route setup
// ======================

app.use(
"/",
public_routes
);

app.use(
"/customer",
auth_routes
);


// ======================
// Start Server
// ======================

const PORT=5000;

app.listen(
PORT,
()=>{

console.log(
`Server running on port ${PORT}`
);

});