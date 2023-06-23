import usersRepository from "./repositories/users.repository.js";
import { config } from "dotenv";
config();

async function seed() {
  const admin = {
    email: "admin@app.com",
    password: "123qwe123",
  };

  await usersRepository.create(admin);
}

seed().then(() => console.log("Seed finalizado"));
