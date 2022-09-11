const {HTTPError} = require ('../excepton/HTTPException');
const {decodeToken} = require ('../helper/authenticate');

let extractAuthenticationInfo = (req, res, next) => {
  try {
    let authHeader = req.headers.authorization;
    if (authHeader.split (' ')[0] != 'Bearer')
      throw HTTPError (400, 'Invalid Authentication Method');
    let token = authHeader.trim ().split (' ')[1];
    let payload = decodeToken (token);
    // verify some extra logic
    req.user = payload;
    next ();
  } catch (error) {
    console.error (error);
    next (new HTTPError (403, 'Forbidden'));
  }
};

module.exports = {
  extractAuthenticationInfo: extractAuthenticationInfo,
};
