const axios = require("axios");
const express = require("express");

const public_users = express.Router();

const books = require("../booksdb");

const users = [];


// ======================
// Task 1
// Get all books
// ======================

public_users.get("/", function(req,res){

return res.send(
JSON.stringify(
books,
null,
4
)
);

});


// ======================
// Task 2
// Get by ISBN
// ======================

public_users.get(
"/isbn/:isbn",
function(req,res){

const isbn=
req.params.isbn;

return res.send(
JSON.stringify(
books[isbn],
null,
4
)
);

});


// ======================
// Task 3
// Get by Author
// ======================

public_users.get(
"/author/:author",
function(req,res){

const author=
req.params.author;

let filteredBooks={};

Object.keys(books)
.forEach(key=>{

if(

books[key]
.author
.toLowerCase()

===

author
.toLowerCase()

){

filteredBooks[key]
=
books[key];

}

});

return res.send(

JSON.stringify(
filteredBooks,
null,
4
)

);

});


// ======================
// Task 4
// Get by Title
// ======================

public_users.get(
"/title/:title",
function(req,res){

const title=
req.params.title;

let filteredBooks={};

Object.keys(books)
.forEach(key=>{

if(

books[key]
.title
.toLowerCase()

===

title
.toLowerCase()

){

filteredBooks[key]
=
books[key];

}

});

return res.send(

JSON.stringify(
filteredBooks,
null,
4
)

);

});


// ======================
// Task 5
// Get Reviews
// ======================

public_users.get(
"/review/:isbn",
function(req,res){

const isbn=
req.params.isbn;

return res.send(

JSON.stringify(
books[isbn]
.reviews,
null,
4
)

);

});


// ======================
// Task 6
// Register User
// ======================

public_users.post(
"/register",
(req,res)=>{

const username=
req.body.username;

const password=
req.body.password;

if(
!username ||
!password
){

return res.status(400)
.json({

message:
"Username and password required"

});

}

let exists=
users.some(

user=>

user.username===
username

);

if(exists){

return res.status(409)
.json({

message:
"User already exists"

});

}

users.push({

username,
password

});

return res.json({

message:
"User registered"

});

});


// ======================
// Task 10
// Get all books
// Async/Await
// ======================

public_users.get(
"/async/books",
async function(req,res){

try{

const response=
await axios.get(
"http://localhost:5000/"
);

return res.send(
response.data
);

}

catch(error){

return res.status(500)
.json({

message:
"Error fetching books"

});

}

});



// ======================
// Task 11
// Get by ISBN
// Promise
// ======================

public_users.get(
"/async/isbn/:isbn",
function(req,res){

const isbn=
req.params.isbn;

axios.get(
`http://localhost:5000/isbn/${isbn}`
)

.then(response=>{

return res.send(
response.data
);

})

.catch(error=>{

return res.status(500)
.json({

message:
"Error retrieving ISBN"

});

});

});



// ======================
// Task 12
// Get by Author
// Async/Await
// ======================

public_users.get(
"/async/author/:author",
async function(req,res){

const author=
req.params.author;

try{

const response=
await axios.get(

`http://localhost:5000/author/${author}`

);

return res.send(
response.data
);

}

catch(error){

return res.status(500)
.json({

message:
"Error retrieving author"

});

}

});



// ======================
// Task 13
// Get by Title
// Promise
// ======================

public_users.get(
"/async/title/:title",
function(req,res){

const title=
req.params.title;

axios.get(

`http://localhost:5000/title/${title}`

)

.then(response=>{

return res.send(
response.data
);

})

.catch(error=>{

return res.status(500)
.json({

message:
"Error retrieving title"

});

});

});


// ======================
// Exports
// ======================

module.exports.public_users =
public_users;

module.exports.users =
users;