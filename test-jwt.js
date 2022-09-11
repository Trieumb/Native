let fs = require ('fs');
let jwt = require ('jsonwebtoken');

let privateKey = fs.readFileSync ('auth.private');
let publicKey = fs.readFileSync ('auth.public');

let data = {
  user: 'Luu Hoang Son',
};
let token = jwt.sign (data, privateKey, {algorithm: 'RS256'});
console.log (token);
let decoded = jwt.verify (token, publicKey, {algorithm: 'RS256'});
console.log (decoded);
