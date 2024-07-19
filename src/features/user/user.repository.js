import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";



class UserRepository {
    async signUp(newUser) {

        try {
            // 1. Get the database
            const db = getDB();

            // 2. Get the collection
            const collection = db.collection("users");

            // 3. Insert the documnent.
            await collection.insertOne(newUser);
            return newUser;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }

    }

    async signIn(email, password) {

        try {
            // 1. Get the database
            const db = getDB();

            // 2. Get the collection
            const collection = db.collection("users");

            // 3. Find the documnent.
            return await collection.findOne({ email, password });
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }

    }

    async findByEmail(email) {

        try {
            // 1. Get the database
            const db = getDB();

            // 2. Get the collection
            const collection = db.collection("users");

            // 3. Find the documnent.
            return await collection.findOne({ email });
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }

    }

}

export default UserRepository
