import { Router } from 'express';
const router = Router();
import { compare, hash } from 'bcrypt';
import userCollection from '../mongoDB.js';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }

    const passwordMatch = await compare(password, user.password);

    if (passwordMatch) {
      res.status(200).json({ message: "Logged In successfully!" , user : user});
    } else {
      res.status(401).json({ message: "Incorrect password." });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await userCollection.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await userCollection.insertMany([
      { firstName, lastName, email, password: hashedPassword },
    ]);

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
