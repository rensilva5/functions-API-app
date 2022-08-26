import dbConnect from "./dbConnect.js";

export async function getTasks(req, res) {
  //add by suer id to this
  const db = dbConnect();
  const collection = await db
    .collection("task")
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
  // will addee user id
  const newTask = req.body;
  if (!newTask || !newTask.task) {
    res.status(400).send({ success: false, message: "invalid request" });
    return;
  }
  const db = dbConnect();
  await db
    .collection("task")
    .add(newTask)
    .catch((err) => res.status(500).send(err));
  res.status(201);
  // .send({success: true, meessage: 'Task Added', })
  getTasks(req, res); // send back the full list task...
}

export function updateTask(req, res) {
  const taskUpdate = req.body;
  const { taskId } = req.params;
  res.status(202).send("Task updated");
}

export function deleteTask(req, res) {
  // const taskUpdate = req.body
  const { taskId } = req.params;
  res.status(203).send("Task Delete");
}
