const express=require("express");

const jwt=require("jsonwebtoken");

const books=
require("./booksdb");

const general=
require("./general");

const users=
general.users;

const authenticated=
express.Router();



// Task 7

authenticated.post(
"/login",
(req,res)=>{

const username=
req.body.username;

const password=
req.body.password;

if(

general.authenticatedUser(
username,
password
)

){

let accessToken=
jwt.sign(

{
username
},

"access",

{
expiresIn:
3600
}

);

req.session.authorization={

accessToken

};

return res.status(200)
.json({

message:
"User logged in successfully"

});

}

return res.status(404)
.json({

message:
"Invalid credentials"

});

});




// Task 8

authenticated.put(
"/review/:isbn",
(req,res)=>{

const username=
req.user.username;

const isbn=
req.params.isbn;

const review=
req.query.review;

books[isbn]
.reviews[
username
]=review;


return res.status(200)
.json({

reviews:
books[isbn]
.reviews

});

});




// Task 9

authenticated.delete(
"/review/:isbn",
(req,res)=>{

const username=
req.user.username;

const isbn=
req.params.isbn;


delete books[
isbn
]
.reviews[
username
];


return res.status(200)
.json({

message:
`Review deleted for ISBN ${isbn}`

});

});


module.exports.authenticated=
authenticated;