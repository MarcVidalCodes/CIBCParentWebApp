import express from 'express';
const app = express();
const PORT = 3001;
import mongoose from 'mongoose';

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

// middleware for logging for all routes
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.put('/api/testServer', async (req, res) => {
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

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});