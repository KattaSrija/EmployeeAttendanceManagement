import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function dropEmployeeIdIndex() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const collection = mongoose.connection.db.collection("users");

    const indexes = await collection.indexes();
    console.log("Existing indexes:", indexes);

    try {
      await collection.dropIndex("employeeId_1");
      console.log("🚀 Successfully removed index: employeeId_1");
    } catch (err) {
      console.log("⚠️ Could not drop 'employeeId_1':", err.message);
    }

    await mongoose.disconnect();
    console.log("Done - MongoDB disconnected.");
  } catch (error) {
    console.error("Error while dropping index:", error);
  }
}

dropEmployeeIdIndex();
