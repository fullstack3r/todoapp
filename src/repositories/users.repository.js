import { MongoClient } from "mongodb";
import { hash } from "bcrypt";

async function getCollection() {
  const dburl = process.env.MONGODB_URL;
  const database = "todoapp";
  const dbcollection = "users";
  const client = await MongoClient.connect(dburl);

  return client.db(database).collection(dbcollection);
}

async function getByEmail(email) {
  const collection = await getCollection();

  return collection.findOne({ email });
}

async function create(user) {
  const exists = await getByEmail(user.email);
  if (exists) {
    return;
  }

  const collection = await getCollection();
  if (user.password) {
    user.password = await hash(user.password, 10);
  }

  return collection.insertOne(user);
}

export default { getByEmail, create };
