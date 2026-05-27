const express=require("express");
const axios=require("axios");

const books=require("./booksdb");

const public_users=express.Router();

let users=[];

function isValid(username){

return users.some(
user=>user.username===username
);

}

function authenticatedUser(
username,
password
){

return users.some(

user=>

user.username===username &&
user.password===password

);

}



// Task 1

public_users.get(
"/",
(req,res)=>{

return res.send(
JSON.stringify(
books,
null,
4
)
);

});



// Task 2

public_users.get(
"/isbn/:isbn",
(req,res)=>{

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




// Task 3

public_users.get(
"/author/:author",
(req,res)=>{

const author=
req.params.author;

let filtered={};

Object.keys(
books
).forEach(key=>{

if(

books[key]
.author
.toLowerCase()

===

author
.toLowerCase()

){

filtered[key]=
books[key];

}

});

return res.send(
JSON.stringify(
filtered,
null,
4
)
);

});




// Task 4

public_users.get(
"/title/:title",
(req,res)=>{

const title=
req.params.title;

let filtered={};

Object.keys(
books
).forEach(key=>{

if(

books[key]
.title
.toLowerCase()

===

title
.toLowerCase()

){

filtered[key]=
books[key];

}

});

return res.send(
JSON.stringify(
filtered,
null,
4
)
);

});




// Task 5

public_users.get(
"/review/:isbn",
(req,res)=>{

return res.send(

JSON.stringify(

books[
req.params.isbn
].reviews,

null,
4

)

);

});




// Task 6

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

return res.status(404)
.json({

message:
"Username or password missing"

});

}

if(
isValid(
username
)
){

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

return res.status(200)
.json({

message:
"User successfully registered. Now you can login"

});

});




// Task 10

public_users.get(
"/async/books",
async(req,res)=>{

const response=
await axios.get(
"http://localhost:5000/"
);

res.send(
response.data
);

});




// Task 11

public_users.get(
"/async/isbn/:isbn",
(req,res)=>{

axios.get(

`http://localhost:5000/isbn/${req.params.isbn}`

)

.then(response=>{

res.send(
response.data
);

});

});




// Task 12

public_users.get(
"/async/author/:author",
async(req,res)=>{

const response=
await axios.get(

`http://localhost:5000/author/${req.params.author}`

);

res.send(
response.data
);

});




// Task 13

public_users.get(
"/async/title/:title",
(req,res)=>{

axios.get(

`http://localhost:5000/title/${req.params.title}`

)

.then(response=>{

res.send(
response.data
);

});

});


module.exports.general=
public_users;

module.exports.users=
users;

module.exports.authenticatedUser=
authenticatedUser;