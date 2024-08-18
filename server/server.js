import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
const PORT = 3001;

// connect to mongodb
// mongoose.connect('mongodb://127.0.0.1:27017/olli');
// const db = mongoose.connection
// // event listeners for connection events
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// middleware to parse JSON request bodies
app.use(express.json()); 
app.use(cors());


// connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/cibc');
const db = mongoose.connection
// event listeners for connection events
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// schemas for MongoDB


const AccountSchema = new mongoose.Schema({
    acctId: {type: String, required: true},
    acctType: {type: String, required: true},
    acctBal: {type: String, required: true},
    acctLimit: {type: String, required: true},
    acctPurchases: {type: String, required: true},
    allowanceAmt: {type: Number, required: false},
    allowanceFreq: {type: Number, required: false},
    allowanceSourceId: {type: Number, required: false},
    acctFrozen: {type: Boolean, required: true}
});
const Accounts = mongoose.model('Accounts', AccountSchema);

const UserSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    accounts: {type: [AccountSchema], required: false},
    username: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: false},

});
const Users = mongoose.model('Users', UserSchema);

const PurchaseSchema = new mongoose.Schema({
    prcId: {type: String, required: true},
    prcName: {type: String, required: false},
    prcApproved: {type: String, required: true},
    prcTag: {type: String, required: true},
    // prcTag: {type: [TagSchema], required: true},
    acctId: {type: String, required: true},
    debitorId: {type: String, required: true},
    creditorId: {type: String, required: true}
});
    
const Purchases = mongoose.model('Purchases', PurchaseSchema);

// middleware for logging for all routes
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/api/testServer', async (req, res) => {
    try {
        let msg = "worked";
        console.log("api routes working!!!!")
        res.status(200).json(msg);
    }
    catch (error) {
        // error handling
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

});



// -------------------------------------------
// 1. -> User Registration and Authentication
// -------------------------------------------

// Create User (Sign Up)
app.post('/api/users/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const newUser = new Users({
            ...req.body,
            password: hashedPassword // Save the hashed password
        });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', userId: newUser._id });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Read (Sign In)
app.post('/api/users/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        const user = await Users.findOne({ username, password });
        if (user) {
            res.status(200).json({ message: 'User authenticated successfully', userId: user._id });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error in /api/users/signin:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Delete (Remove User)
app.delete('/api/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await Users.findByIdAndDelete(userId);
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// -------------------------------------------
// 2. -> Dashboard
// -------------------------------------------

// Link a new child account to the parent’s main account
app.post('/api/parents/:parentId/children', async (req, res) => {
    try {
        const { parentId } = req.params;
        const childAccount = req.body; // Assuming childAccount contains all necessary child account info
        const parentUser = await Users.findById(parentId);

        if (!parentUser) {
            return res.status(404).json({ error: 'Parent user not found' });
        }

        // Add child account to parent's accounts array
        parentUser.accounts.push(childAccount);
        await parentUser.save();

        res.status(201).json({ message: 'Child account linked successfully', parentUser });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Retrieve all linked child accounts for a parent
app.get('/api/parents/:parentId/children', async (req, res) => {
    try {
        const { parentId } = req.params;
        const parentUser = await Users.findById(parentId).populate('accounts');

        if (!parentUser) {
            return res.status(404).json({ error: 'Parent user not found' });
        }

        res.status(200).json({ childAccounts: parentUser.accounts });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// -------------------------------------------
// 3. -> Fund Management
// -------------------------------------------

// Load Funds: Add funds to a child account and withdraw the equivalent amount from the parent's account
app.post('/api/funds/:childId/load', async (req, res) => {
    try {
        const { childId } = req.params;
        const { amount, parentId } = req.body; // Assuming amount is provided in the request body
        const childAccount = await Users.findById(childId);
        const parentAccount = await Users.findById(parentId);

        if (!childAccount) {
            return res.status(404).json({ error: 'Child account not found' });
        }

        if (!parentAccount) {
            return res.status(404).json({ error: 'Parent account not found' });
        }

        // Check if parent account has enough balance
        if (parentAccount.balance < amount) {
            return res.status(400).json({ error: 'Insufficient funds in parent account' });
        }

        // Withdraw from parent account and add to child account
        parentAccount.balance -= amount;
        childAccount.balance += amount;

        await parentAccount.save();
        await childAccount.save();

        res.status(200).json({ message: 'Funds loaded successfully', childBalance: childAccount.balance, parentBalance: parentAccount.balance });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API call to let user customize allowance amount, frequency and the accountid of the account money comes in from
app.post('/api/allowance/:childId/set', async (req, res) => {
    try {
        const { childId } = req.params;
        const { allowanceAmt, allowanceFreq, parentId } = req.body; // Assuming these are provided in the request body

        // Validate allowance amount and frequency
        if (allowanceAmt <= 0 || allowanceFreq <= 0) {
            return res.status(400).json({ error: 'Invalid allowance amount or frequency' });
        }

        // Find child and parent accounts
        const childAccount = await Accounts.findById(childId);
        const parentAccount = await Accounts.findById(parentId);

        if (!childAccount) {
            return res.status(404).json({ error: 'Child account not found' });
        }

        if (!parentAccount) {
            return res.status(404).json({ error: 'Parent account not found' });
        }

        // Set allowance details in child account
        childAccount.allowanceAmt = allowanceAmt;
        childAccount.allowanceFreq = allowanceFreq;
        childAccount.allowanceSourceId = parentAccount._id; // Linking parent account as the source of allowance

        await childAccount.save();

        res.status(200).json({ message: 'Allowance set successfully', childAccount });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// -------------------------------------------
// 4. -> Spending Controls
// -------------------------------------------

// Set Spending Limits
app.post('/api/controls/:childId/setLimits', async (req, res) => {
    try {
        const { childId } = req.params;
        const { limits } = req.body; // Expecting limits to be an object like { entertainment: 100, food: 50 }

        const childAccount = await Accounts.findById(childId);

        if (!childAccount) {
            return res.status(404).json({ error: 'Child account not found' });
        }

        // Assuming childAccount has a field for spending limits
        childAccount.spendingLimits = limits;

        await childAccount.save();

        res.status(200).json({ message: 'Spending limits set successfully', spendingLimits: childAccount.spendingLimits });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Freeze/Unfreeze Card
app.post('/api/controls/:childId/freeze', async (req, res) => {
    try {
        const { childId } = req.params;
        const { action } = req.body; // Expecting action to be either 'freeze' or 'unfreeze'

        const childAccount = await Accounts.findById(childId);

        if (!childAccount) {
            return res.status(404).json({ error: 'Child account not found' });
        }

        // Assuming childAccount has a field to represent card status
        childAccount.acctFrozen = action;

        await childAccount.save();

        if (action){
            const statusMessage = 'Card frozen successfully!';
        }
        else{
            const statusMessage = 'Card unfrozen successfully!';
        }
        
        res.status(200).json({ message: statusMessage, cardStatus: childAccount.cardFrozen ? 'Frozen' : 'Active' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});