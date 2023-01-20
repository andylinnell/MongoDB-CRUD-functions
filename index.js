import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();


const client = new MongoClient(process.env.URI);
const db = client.db(process.env.DB_NAME);
const collection = db.collection('movies')

/* OBJECT: CREATE
************************************ */
const movie1 = {
    title: "AnotherMovie",
    rating: "R",
    genre: "Sci-fi",
    time: "forever"
}

/* CRUD: CREATE
************************************ */
const addDoc = async thisDoc => {
    const result = await collection.insertOne(thisDoc)
    console.log("Result Doc Add:",result)
}

/* CRUD: GET
************************************ */
const getDocListing = async (queryLimit) => {
    const result = await collection.find({}).limit(queryLimit).toArray()
    console.table(result)
}

/* CRUD: UPDATE
************************************ */
const updateDoc = async (docId, fieldName, fieldValue) => {
    const updateID = {_id: new ObjectId(docId)};
    const updateQuery = {$set: {[fieldName]: fieldValue}};
    const result = await collection.findOneAndUpdate(updateID, updateQuery);
}

/* CRUD: DELETE
************************************ */
const deleteDoc = async (docId) => {
    const deleteID = { _id: new ObjectId(docId)};
    await collection.deleteOne(deleteID);
}

// await deleteDoc('63c9a7882d4682eb97ac7a19');
// await updateDoc('63c9972854bd6fa4e6f12780','rating','G');
await addDoc(movie1)
await getDocListing(0);

client.close();
