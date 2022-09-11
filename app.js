let express = require ('express');
let logger = require ('morgan');
let fs = require ('fs');
let app = express ();
let main = require ('./src/routing');

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

module.exports = app;
