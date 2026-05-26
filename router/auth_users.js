const express=require("express");

const jwt=require("jsonwebtoken");

const regd_users=
express.Router();

const books=
require("../booksdb");

const general=
require("./general");

const users=
general.users;


function authenticatedUser(
username,
password
){

let validusers=
users.filter(

user=>

user.username===
username
&&
user.password===
password

);

return validusers.length>0;

}


// Task 7
regd_users.post(
"/login",
(req,res)=>{

const username=
req.body.username;

const password=
req.body.password;

if(
!username ||
!password
){

return res.status(404)
.json({
message:
"Username/password missing"
});

}

if(
authenticatedUser(
username,
password
)
){

let accessToken=
jwt.sign(
{
username:
username
},
"access",
{
expiresIn:
60*60
}
);

req.session
.authorization={

accessToken

};

return res.status(200)
.json({

message:
"User logged in successfully"

});

}

return res.status(208)
.json({

message:
"Invalid login details"

});

});



// Task 8
regd_users.put(
"/auth/review/:isbn",
(req,res)=>{

const username=
req.username;

const isbn=
req.params.isbn;

const review=
req.query.review;

if(
books[isbn]
){

books[isbn]
.reviews[
username
]=review;

return res.status(200)
.json({

message:
"Review added/updated successfully"

});

}

return res.status(404)
.json({

message:
"Book not found"

});

});



// Task 9
regd_users.delete(
"/auth/review/:isbn",
(req,res)=>{

const username=
req.username;

const isbn=
req.params.isbn;

if(
books[isbn]
){

delete books[isbn]
.reviews[
username
];

return res.status(200)
.json({

message:
"Review deleted successfully"

});

}

return res.status(404)
.json({

message:
"Book not found"

});

});

module.exports=
regd_users;