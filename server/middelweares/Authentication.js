const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  // Extract the token from the request headers
  const token = req.headers.authorization;

  // Check if a token exists
  if (!token) {
    // If no token is provided, send a 403 Forbidden status and an error message
    res.status(403).send("A token is required for authentication");
    return;
  }

  try {
    // Verify the token using the TOKEN_KEY from the environment configuration
    const decoded = jwt.verify(token, config.TOKEN_KEY);

    // If the token is valid, store the decoded user information in the request object
    req.user = decoded;
  } catch (err) {
    // If the token is invalid or expired, send a 401 Unauthorized status and an error message
    return res.status(401).send("Invalid Token");
  }

  // If the token is valid, continue to the next middleware or route handler
  return next();
};

module.exports = verifyToken;


