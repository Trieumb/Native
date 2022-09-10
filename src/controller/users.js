let fs = require ('fs');
const {ServerResponse} = require ('http');

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

let createUser = (req, res) => {
  // phai co express.json()
  let users = fs.readFileSync ('data/users.json', {encoding: 'utf8'});
  users = JSON.parse (users);

  let existedUser = users.find (user => user.id === req.body.id);

  if (existedUser) {
    return res.status (400).json ({
      message: 'User id existed!',
    });
  }
  let user = {
    id: req.body.id,
    name: req.body.name,
    address: req.body.address,
  };

  users.push (user);
  let usersStr = JSON.stringify (users);
  fs.writeFileSync ('data/users.json', usersStr, {encoding: 'utf-8'});
  res.status (201).json ({message: 'Created!'});
};

let updateUserInformation = (req, res) => {
  let users = fs.readFileSync ('data/users.json', {encoding: 'utf8'});
  users = JSON.parse (users);

  let userIndex = users.findIndex (user => user.id === req.params.id);

  let foundUser = users[userIndex];

  if (userIndex < 0) {
    return res.status (404).json ({
      message: `User with id:${req.params.id} not found`,
    });
  }

  let updatedUser = {
    id: foundUser.id,
    name: req.body.name || foundUser.name,
    address: req.body.address || foundUser.address,
  };

  users[userIndex] = updatedUser;

  const usersStr = JSON.stringify (users);

  fs.writeFileSync ('data/users.json', usersStr);

  res.json ({
    message: 'Updated user!',
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
  updateUserInformation: updateUserInformation,
  deleteUser: deleteUser,
};
