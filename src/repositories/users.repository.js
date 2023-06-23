import { MongoClient } from "mongodb";

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
  const collection = await getCollection();


  return collection.insertOne(user);
}

export default { getByEmail, create };
