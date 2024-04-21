import { connect, Schema, model } from "mongoose";

connect("mongodb://127.0.0.1:27017/ExpenseTracker")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

  const userSchema = new Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    transactions: [{
        type: Schema.Types.Mixed // Allow any object
      }],
    wallets: [{
      name: {
        type: String,
        required: true
      },
      balance: {
        type: Number,
        required: true
      }
      // Add more fields as needed
    }]
  });
  

const userCollection = model("Users", userSchema);

export default userCollection;