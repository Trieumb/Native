const fs = require ('fs');
const {ServerResponse} = require ('http');

const {HTTPError} = require ('../excepton/HTTPException');
const {encodeToken} = require ('../helper/authenticate');

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

let getUserByName = (req, res) => {
  let users = fs.readFileSync ('data/users.json', {encoding: 'utf8'});
  data = JSON.parse (users);
  let user = data.find (user => user.name === req.params.name);
  if (user) {
    res.json ({message: `Hi ${req.params.name}`, information: user});
  } else {
    res.status (404).json ({
      message: `User with name:${req.params.name} not found`,
    });
  }
};

// sign-up

let createUser = (req, res) => {
  let users = fs.readFileSync ('data/users.json', {encoding: 'utf8'});
  users = JSON.parse (users);

  let user = {
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    password: req.body.password,
  };
  // involve logic

  let emailList = users.map (e => e.email);
  if (emailList.includes (user.email))
    throw new HTTPError (400, 'Email existed!');
  if (user.password.length < 9)
    throw new HTTPError (400, 'Password is not strong!');

  users.push (user);
  let usersStr = JSON.stringify (users);
  fs.writeFileSync ('data/users.json', usersStr, {encoding: 'utf-8'});
  res.status (201).json ({message: 'Created!'});
};

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

let updateUserInformation = (req, res) => {
  let users = JSON.parse (
    fs.readFileSync ('data/users.json', {encoding: 'utf8'})
  );
  let user = req.user;
  let new_information = {
    name: req.body.name,
    address: req.body.address,
  };
  // verify info
  user.name = new_information.name;
  user.address = new_information.address;
  let emailList = users.map (e => e.email);
  let userIndex = emailList.indexOf (user.email);
  if (userIndex == -1) throw new HTTPError (404, 'Not Found');

  users[userIndex] = user;

  const usersStr = JSON.stringify (users);

  fs.writeFileSync ('data/users.json', usersStr);

  res.json ({
    message: 'Updated!',
  });
};

let deleteUser = (req, res) => {
  let users = fs.readFileSync ('data/users.json', {encoding: 'utf8'});
  users = JSON.parse (users);

  let userIndex = users.findIndex (user => user.id === req.params.id);

  if (userIndex < 0) {
    return res.status (404).json ({
      message: `User with id:${req.params.id} not found`,
    });
  }

  users.splice (userIndex, 1);

  let usersStr = JSON.stringify (users);

  fs.writeFileSync ('data/users.json', usersStr);

  res.status (200).json ({
    message: 'deleted user',
  });
};

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
