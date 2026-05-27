const express=require('express');
const jwt=require('jsonwebtoken');

const books=
require("./booksdb.js");

const general=
require("./general");

const users=
general.users;

const authenticated=
express.Router();

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
{username},
"access",
{
expiresIn:3600
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

authenticated.put(
"/auth/review/:isbn",
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
message:
"Review added"
});

});

authenticated.delete(
"/auth/review/:isbn",
(req,res)=>{

const username=
req.user.username;

const isbn=
req.params.isbn;

delete books[isbn]
.reviews[
username
];

return res.status(200)
.json({
message:
"Review deleted"
});

});

module.exports.authenticated=
authenticated;
