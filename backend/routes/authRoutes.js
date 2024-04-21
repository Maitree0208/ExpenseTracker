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
    const payload = {
      firstName : user.firstName,
      lastName : user.lastName,
      email : user.email
    }
    if (passwordMatch) {
      res.status(200).json({ message: "Logged In successfully!" , user : payload});
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

router.post('/update-wallet', async (req, res) => {
  try {
    const { email, walletName, balance } = req.body;

    // Find the user by email
    const user = await userCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the wallet by name
    let wallet = user.wallets.find(wallet => wallet.name === walletName);

    if (!wallet) {
      // If wallet doesn't exist, create a new one
      wallet = {
        name: walletName,
        balance: balance
      };
      user.wallets.push(wallet);
    } 
    else {
      // If wallet already exists, update its balance
      return res.status(404).json({ message: 'Wallet Already Exists' });
    }

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Wallet updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/wallet-names', async (req, res) => {
  try {
    const { email } = req.body;

    // Use MongoDB aggregation to project only the wallet names
    const user = await userCollection.aggregate([
      { $match: { email } }, // Match the user by email
      { $project: { _id: 0, walletNames: '$wallets.name' } } // Project only the wallet names
    ]);

    if (!user || !user[0]) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { walletNames } = user[0]; // Extract wallet names from the user object

    res.status(200).json({ walletNames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
