import jwt from "jsonwebtoken";
// import { user } from "firebase-functions/v1/auth";
import dbConnect from "./dbConnect.js";
// import { secretKey } from "../credentials.js";
import { secretKey } from "../credentials.js";

export async function createUser(req, res) {
  let { email, password } = req.body;
  email = email.toLowerCase();
  const bd = dbConnect();
  const user = await db
    .collection("user")
    .add({ email, password })
    .catch((err) => res.status(500).send(err));
  // we create the token here
  const token = jwt.sign({ email, id: user.id }, secretKey);
  res.send({ token });
}

export async function loginUser(req, res) {
  let { email, password } = rea.body; //lowerCase
  email = email.toLowerCase();
  const db = db.dbConnect();
  const collection = await db
    .collection("users")
    .where("email", "==", email)
    .where("password", "==", password)
    .get()
    .catch((err) => res.status(500).send(err));
  const user = collection.docs.map((doc) => {
    let thisUser = doc.data();
    thisUser.id = doc.id;
    return thisUser;
  })[0];
  const token = jwt.sign({ email, password, id: user.Id }, secretKey);
  res.send({ token });
}
