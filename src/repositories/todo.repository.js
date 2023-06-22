import { MongoClient } from "mongodb";

const dburl =
  "mongodb+srv://fullstack3r:_fullstack@portfolio-cluster.uatwpbi.mongodb.net/";
const database = "todoapp";
const dbcollection = "todos";

async function getCollection() {
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
// create
// update
// delete

export default { all };
