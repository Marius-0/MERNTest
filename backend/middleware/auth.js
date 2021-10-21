import jwt from "jsonwebtoken";

const config = process.env;

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).send("No token found");
  }
  try {
    const data = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = {};
    req.user.id = data.id;
    req.user.email = data.email;
    req.user.role = data.role;
    req.user.firstName = data.firstName;
    return next();
  } catch {
    return res.status(403).send("Invalid token"); //redirect(403, "http://localhost:3000/login");
  }
};

export default authorization;
