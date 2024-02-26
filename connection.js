import { MongoClient, ObjectId } from "mongodb"
import "dotenv/config"

const uri = process.env.URI;
const client = new MongoClient(uri);
const db = client.db(process.env.DB);
const col = db.collection(process.env.COLLECTION);

export async function main() {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  }
}

export const getTodoItems = () => {
  try {
    return col.find().toArray();
  } catch (error) {
    console.log(error);
  }
}

export const getTodoItem = (id) => {
  try {
    return col.findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.log(error);
  }
}

export async function createTodoItem(item) {
  await col.insertOne(item);
  return col.find().toArray();
}

export async function updateTodoItem(update) {
  const { _id, title, completed } = update;
  await col.updateOne(
    { _id: ObjectId(_id) },
    { $set: { title: title, completed: completed } }
  );
  return col.find().toArray();
}

export async function deleteTodoItem(id) {
  await col.deleteOne({ _id: new ObjectId(id) });
  return col.find().toArray();
}

export async function deleteAllCompletedTodos() {
  await col.deleteMany({ completed: true });
  return col.find().toArray();
}
