import functions from "firebase-functions"
import  express  from "express"
import cors from "cors"
import { getTask, createTask, updateTask, deleteTask } from "./src/tasks.js"

const app = express()
app.use(cors())
app.use(express.json())

app.get('/task', getTask)
app.post('/task', createTask)
app.patch('/task/:taskId', updatedTask)
app.delete('/task/:taskId', deleteTask)


export const api = functions.https.onRequest(app)


// This is my API.