import { Router } from 'express';
const router = Router();
import userCollection from '../mongoDB.js';

// Route handler for saving a transaction
router.post('/transactions', async (req, res) => {
    try {
      // Parse request body to extract transaction object and email
      const { type, from, amount, note, date, email } = req.body;
  
      // Find the user by email
      const user = await userCollection.findOne({ email });
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Create transaction object based on type
      let transaction;
      if (type === 'income' || type === 'expense') {
        // Find the wallet by name
        const wallet = user.wallets.find(wallet => wallet.name === from);
        if (!wallet) {
          return res.status(400).json({ error: 'Wallet not found' });
        }
  
        // Check if the type is 'income' or 'expense'
        if (type === 'income') {
          // Update wallet balance for income
          wallet.balance += amount;
        } else if (type === 'expense') {
          // Check if wallet has sufficient balance for expense
          if (wallet.balance < amount) {
            return res.status(400).json({ error: 'Insufficient balance' });
          }
  
          // Deduct amount from wallet balance for expense
          wallet.balance -= amount;
        }
  
        // Create transaction object
        transaction = {
          type: type,
          amount: amount,
          note: note,
          date: date,
          walletId: wallet._id // Use the wallet ID from the found wallet
        };
      } else {
        return res.status(400).json({ error: 'Invalid transaction type' });
      }
  
      // Update the transactions array for the found user
      user.transactions.push(transaction);
  
      // Save the updated user
      await user.save();
  
      // Return updated user object as response
      res.status(200).json({ message: 'Transaction Successful' });
    } catch (error) {
      // Handle errors
      console.error('Error saving transaction:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  // Route handler for saving a wallet transfer transaction
  router.post('/transfer', async (req, res) => {
    try {
        // Parse request body to extract transfer object and email
        const { from, to, amount, note, date, email } = req.body;

        // Find the user by email
        const user = await userCollection.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the "from" wallet by name
        const fromWallet = user.wallets.find(wallet => wallet.name === from);
        if (!fromWallet) {
            return res.status(400).json({ error: 'From wallet not found' });
        }

        // Find the "to" wallet by name
        const toWallet = user.wallets.find(wallet => wallet.name === to);
        if (!toWallet) {
            return res.status(400).json({ error: 'To wallet not found' });
        }

        // Check if "from" wallet has sufficient balance
        if (fromWallet.balance < amount) {
            return res.status(400).json({ error: 'Insufficient balance in the from wallet' });
        }

        // Deduct amount from "from" wallet balance
        fromWallet.balance -= amount;

        // Add amount to "to" wallet balance
        toWallet.balance += amount;

        // Create transfer transaction object
        const transaction = {
            amount: amount,
            date: date,
            note: note,
            type: 'transfer',
            walletId: fromWallet._id // Use the ID of the "from" wallet
        };

        // Update the transactions array for the found user
        user.transactions.push(transaction);

        // Save the updated user
        await user.save();

        // Return updated user object as response
        res.status(200).json({ message: "Transfer Successful" });
    } catch (error) {
        // Handle errors
        console.error('Error saving transfer transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


  export default router;

