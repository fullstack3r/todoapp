import jwt from "jsonwebtoken";

function authenticate(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send("Autorizacion requerida!");
  }
  const token = authorization.split(" ").pop();

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return res.status(401).send("No autorizado!");
  }

  next();
}

export default authenticate;
