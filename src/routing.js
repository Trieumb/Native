const express = require ('express');
const mainRouter = express.Router ();
const {
  getUser,
  getUserById,
  getUserByName,
  createUser,
  updateUserInformation,
  deleteUser,
} = require ('./controller/users');

let mw = (req, res, next) => {
  console.log ('First direction');
  next ();
  res.json ({message: 'fail b/c mw'});
};
mainRouter.get ('/user', mw, getUser);
mainRouter.get ('/user/:id', getUserById);
mainRouter.get ('/user/:name', getUserByName);
mainRouter.post ('/user', createUser);
mainRouter.put ('/user/:id', updateUserInformation);
mainRouter.delete ('/user/:id', deleteUser);

module.exports = mainRouter;
