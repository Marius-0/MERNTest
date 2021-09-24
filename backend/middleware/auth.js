import jwt from "jsonwebtoken"

const config = process.env;

const authorization = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) {
    console.log('no token red')
    return res.location('localhost:3000/login') //.status(403).send("No token found")
  }
  try {
      const data = jwt.verify(token, process.env.TOKEN_KEY)
      req.userId = data.id
      req.userEmail = data.email
      req.userRole = data.role
      req.firstName = data.firstName
      return next()
  } catch {
    console.log('Invalid token')
    return res.redirect(403, 'http://localhost:3000/login')//.send("Invalid token")
  }
}

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, 'secret');//process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    console.error(err);
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default authorization;
