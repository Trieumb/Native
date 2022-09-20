let express = require ('express');
let logger = require ('morgan');
let fs = require ('fs');
let app = express ();
let main = require ('./src/routing');
let {connectDB} = require ('./src/helper/connect');

app.use (express.json ());
app.use (logger ('dev'));
app.use (main);

let error_handler = (err, req, res, next) => {
  console.error (err);
  res.status (500).json ({
    detail: err.message,
  });
};
app.use (error_handler);

connectDB ();
module.exports = app;
