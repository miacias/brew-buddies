const jwt = require('jsonwebtoken');

// const secret = process.env.SECRET_KEY;
const expiration = '2h';

module.exports = {
  // protects routes via authentication
  authMiddleware({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // removes "Bearer", then returns token string
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    // return request if token is false
    if (!token) {
      return req;
    }
    // adds the decoded user data to request to be accessed in resolver
    try {
      const { data } = jwt.verify(token, process.env.SECRET_KEY, {
        maxAge: expiration,
      });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
    // returns request object to be passed to resolver as 'context'
    return req;
  },
  signToken({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, process.env.SECRET_KEY, {
      expiresIn: expiration,
    });
  },
};
