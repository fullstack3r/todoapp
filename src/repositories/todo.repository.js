import { MongoClient } from "mongodb";


async function getCollection() {
  const dburl = process.env.MONGODB_URL;
  const database = "todoapp";
  const dbcollection = "todos";
  const client = await MongoClient.connect(dburl);

  return client.db(database).collection(dbcollection);
}

async function all(check) {
  const collection = await getCollection();

  const filter = {};
  if (check != null && check != undefined) {
    filter.check = check;
  }

  const result = collection.find(filter);
  return result.toArray();
}

// one
async function one(id) {
  const collection = await getCollection();

  return await collection.findOne({ _id: new ObjectId(id) });
}

// create
async function create(project) {
  const collection = await getCollection();

  return await collection.insertOne(project);
}

// update
async function update(id, data) {
  const collection = await getCollection();

  return collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
}

// delete
async function remove(id) {
  const collection = await getCollection();

  return await collection.deleteOne({ _id: new ObjectId(id) });
}

export default { all, one, create, update, remove };
