const fs = require ('fs');
const {ServerResponse} = require ('http');

const {HTTPError} = require ('../excepton/HTTPException');
const {encodeToken} = require ('../helper/authenticate');
const {db} = require ('./../helper/connect.js');
const asyncHandler = require ('express-async-handler');

let getUser = (req, res) => {
  res.json (data);
};

let getUserById = (req, res) => {
  let users = fs.readFileSync ('data/users.json', {encoding: 'utf8'});
  data = JSON.parse (users);
  let user = data.find (user => user.id === req.params.id);
  if (user) {
    res.json ({message: `Hi User ${req.params.id}`, information: user});
  } else {
    res.status (404).json ({
      message: `User with id:${req.params.id} not found`,
    });
  }
};

let getUserByName = asyncHandler (async (req, res) => {
  let result = await db.db.collection ('users').findOne ({
    name: req.params.name,
  });
  if (result) {
    res.json ({message: `Hi ${req.params.name}`, information: result});
  } else {
    res.status (404).json ({
      message: `User with name:${req.params.name} not found`,
    });
  }
});

// sign-up

let createUser = asyncHandler (async (req, res) => {
  let user = {
    email: req.body.email,
    name: req.body.name,
    address: req.body.address,
    password: req.body.password,
  };
  // involve logic
  // email unique
  // password validation -> 8 char

  let result = await db.db.collection ('users').findOne ({
    email: user.email,
  });
  if (result != null) throw new HTTPError (404, 'Email is existed!');
  await db.db.collection ('users').insert (user);
  res.status (201).json ({
    message: 'Created',
  });
});

// sign-in

let authenticateUser = (req, res) => {
  let users = JSON.parse (
    fs.readFileSync ('data/users.json', {encoding: 'utf8'})
  );
  let credentials = {
    email: req.body.email,
    password: req.body.password,
  };
  let emailList = users.map (e => e.email);
  if (!emailList.includes (credentials.email))
    throw new HTTPError (404, 'Email not found!');

  let user = users.find (user => credentials.email === user.email);
  if (user.password !== credentials.password)
    throw HTTPError (404, 'Password wrong!');

  let token = encodeToken (user);
  res.status (200).json ({
    token: token,
  });
};

let updateUserInformation = asyncHandler (async (req, res) => {
  let user = {
    email: req.body.email,
    name: req.body.name,
    address: req.body.address,
  };
  // verify info

  let result = await db.db.collection ('users').findOne ({
    email: user.email,
  });
  if (result === null) throw new HTTPError (404, 'Email not exist!');
  await db.db.collection ('users').updateOne (
    {email: user.email},
    {
      $set: {
        name: user.name,
        address: user.address,
      },
    }
  );
  res.json ({
    message: 'Updated!',
  });
});

let deleteUser = asyncHandler (async (req, res) => {
  let result = await db.db.collection ('users').findOne ({
    email: req.params.email,
  });
  console.log (result);
  if (result === null) {
    throw new HTTPError (404, 'Email not exist!');
  } else {
    await db.db.collection ('users').remove ({email: result.email});
    res.status (200).json ({
      message: 'deleted!',
    });
  }
});

module.exports = {
  getUser: getUser,
  getUserById: getUserById,
  getUserByName: getUserByName,
  createUser: createUser,
  authenticateUser,
  authenticateUser,
  updateUserInformation: updateUserInformation,
  deleteUser: deleteUser,
};
