import { compare } from "bcrypt";
import usersRepository from "../repositories/users.repository.js";
import jwt from "jsonwebtoken";

async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await usersRepository.getByEmail(email);
  if (!user) {
    return res.status(404).send("Usuario no encontrado");
  }

  const validCredentials = await compare(password, user.password);
  if (!validCredentials) {
    return res.status(401).send("Credenciales inválidas");
  }

  const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
}

export default { login };
