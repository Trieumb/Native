const express = require ('express');
const mainRouter = express.Router ();
const {extractAuthenticationInfo} = require ('./middleware/auth.js');
const {
  getUser,
  getUserById,
  getUserByName,
  createUser,
  updateUserInformation,
  deleteUser,
  authenticateUser,
} = require ('./controller/users');

let {HTTPErorrHandler} = require ('./excepton/HTTPException');

let mw = (req, res, next) => {
  console.log ('First direction');
  next ();
  res.json ({message: 'fail b/c mw'});
};
mainRouter.post ('/sign-up', createUser); // dang ky
mainRouter.post ('/sign-in', authenticateUser); // dang nhap
mainRouter.get ('/user', mw, getUser);
mainRouter.get ('/user/:id', getUserById);
mainRouter.get ('/user/:name', getUserByName);
// mainRouter.post ('/user', createUser);
mainRouter.put ('/user', extractAuthenticationInfo, updateUserInformation);
mainRouter.delete ('/user/:id', deleteUser);
mainRouter.use (HTTPErorrHandler);

module.exports = mainRouter;
