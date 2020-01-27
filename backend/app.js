const express = require("express");

const app = express();

//Access to XMLHttpRequest at 'http://localhost:3000/api/posts' from origin 'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allor-Header",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'asdasds',
      title: 'First server-side post',
      content: 'This is coming from the server side'
    },
    {
      id: 'tgtgsvv',
      title: 'Second server-side post',
      content: 'This is coming from the server side'
    }
  ];
  res.status(200).json({
    message: 'Post fetched succesfully',
    posts: posts
  });
});

module.exports = app;
