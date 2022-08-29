let express = require ('express');
let logger = require ('morgan');
let fs = require ('fs');

const fetch = (...args) =>
  import ('node-fetch').then (({default: fetch}) => fetch (...args));

let app = express ();

app.use (logger ('dev'));
app.use (express.json ());

let home_handeler = (req, res) => {
  res.json ({
    message: 'hello',
  });
};

// get API
let getApi_handeler = async (req, res) => {
  const response = await fetch ('https://pokeapi.co/api/v2/pokemon/ditto');
  if (response.ok) {
    try {
      const data = await response.json ();
      res.json (data);
    } catch (err) {
      console.log (err);
    }
  }
};

// endpoint user
let user_handeler = (req, res, next) => {
  fs.readFile ('data/users.json', 'utf8', (err, data) => {
    if (err) {
      next (err);
    }
    res.json (data);
  });
};
// endpoint comment
let comment_handeler = (req, res, next) => {
  fs.readFile ('data/comments.json', 'utf8', (err, data) => {
    if (err) {
      next (err);
    }
    res.json (data);
  });
};

// handler error
let error_handler = (err, req, res, next) => {
  res.status (500).json ({
    message: err.message,
  });
};

app.use (error_handler);
app.use ('/user', user_handeler);
app.get ('/pokemon', getApi_handeler);
app.get ('/comment', comment_handeler);
app.use ('/', home_handeler);

module.exports = app;
