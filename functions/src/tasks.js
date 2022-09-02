import jwt from "jsonwebtoken";
import dbConnect from "./dbConnect.js";
import { secrectKey } from "../credentials.js";

export async function getTasks(req, res) {
  const token = req.headers.authorization;
  const user = jwt.verify(token, secrectKey);
  const db = dbConnect();
  const collection = await db
    .collection("task")
    .where("userId", "==", user.id)
    .get()
    .catch((err) => res.status(500).send(err));
  const tasks = collection.docs.map((doc) => {
    // return {...doc.data(), id: doc.id}
    let task = doc.data();
    task.id = doc.id;
    return task;
  });
  res.send(tasks);
}

export async function createTask(req, res) {
  const token = req.headers.authorization;
  let newTask = req.body;
  const user = jwt.verify(token, secrectKey);
  if (!newTask || !newTask.task || !user) {
    res.status(400).send({ success: false, message: "invalid request" });
    return;
  }
  newTask.userId = user.id;
  const db = dbConnect();
  await db
    .collection("task")
    .add(newTask)
    .catch((err) => res.status(500).send(err));
  res.status(201);
  // .send({success: true, meessage: 'Task Added', })
  getTasks(req, res); // send back the full list task...
}

export async function updateTask(req, res) {
  const taskUpdate = req.body;
  const { taskId } = req.params;
  const db = dbConnect();
  await db
    .collection("task")
    .doc(taskId)
    .update(taskUpdate)
    .catch((err) => res.status(500).send(err));
  res.status(202);
  getTasks(req, res);
}

export function deleteTask(req, res) {
  // const taskUpdate = req.body
  const { taskId } = req.params;
  res.status(203).send("Task Delete");
}
