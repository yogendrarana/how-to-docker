import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/connectdb.js';
import { UserModel } from './models/user.model.js';

const app = express();

// dot env
dotenv.config({ path: './.env' });

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to database
connectDB();

// routes 
app.get('/', (_, res) => res.send('Docker is easy!'));

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "All fields are required" });
    }

    const user = await UserModel.create({ email, password });
    res.status(201).json({ user });
})

app.get('/users', async (req, res) => {
    const users = await UserModel.find().select('-password -__v');
    res.status(200).json({ users })
})

// listen on portc
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});