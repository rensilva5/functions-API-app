import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from 'firebase-admin/firestore'
import { credentials } from "../credentials.js";

export default function dbConnect() {

    if (!getApps().length) {
        // not yet connected
        initializeApp({
            credential: cert(credentials)
        })
    }
    return getFirestore()

}