const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.URI;
const client = new MongoClient(uri);
const db = client.db(process.env.DB);
const col = db.collection(process.env.COLLECTION);

async function main() {
  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  }
}

function getTodoItems() {
  return col.find().toArray();
}

function getTodoItem(id) {
  return col.findOne({ _id: new ObjectId(id) });
}

async function createTodoItem(item) {
  await col.insertOne(item);
  return col.find().toArray();
}

async function updateTodoItem(update) {
  const { _id, title, completed } = update;
  await col.updateOne(
    { _id: ObjectId(_id) },
    { $set: { title: title, completed: completed } }
  );
  return col.find().toArray();
}

async function deleteTodoItem(id) {
  await col.deleteOne({ _id: new ObjectId(id) });
  return col.find().toArray();
}

async function deleteAllCompletedTodos() {
  await col.deleteMany({ completed: true });
  return col.find().toArray();
}

module.exports.main = main;
module.exports.getTodoItems = getTodoItems;
module.exports.getTodoItem = getTodoItem;
module.exports.createTodoItem = createTodoItem;
module.exports.updateTodoItem = updateTodoItem;
module.exports.deleteTodoItem = deleteTodoItem;
module.exports.deleteCompletedTodos = deleteAllCompletedTodos;
