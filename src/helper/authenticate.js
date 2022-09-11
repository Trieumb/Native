let fs = require ('fs');
let jwt = require ('jsonwebtoken');

EXPIRE_TIME = 3 * 60 * 60;
let encodeToken = payload => {
  let privateKey = fs.readFileSync ('auth.private');
  let token = jwt.sign (payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: EXPIRE_TIME,
  });
  return token;
};

let decodeToken = token => {
  let publicKey = fs.readFileSync ('auth.public');
  let payload = jwt.verify (token, publicKey, {algorithm: 'RS256'});
  delete payload.iat;
  delete payload.exp;
  return payload;
};

module.exports = {
  encodeToken: encodeToken,
  decodeToken: decodeToken,
};
