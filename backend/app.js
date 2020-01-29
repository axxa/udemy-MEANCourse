const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb://axxa:123456@localhost:27017/mean', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("connected to my mongo db: mean");
})
.catch(() => {
  console.log('Connection failed!!')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//Access to XMLHttpRequest at 'http://localhost:3000/api/posts' from origin 'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added succesfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Post fetched succesfully',
      posts: documents
    });
  });

});

module.exports = app;
