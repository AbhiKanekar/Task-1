import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import meRoutes from './routes/me.route.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('API is running...');
})

app.use('/api/users', authRoutes);
app.use('/api', meRoutes);


// Connect to MongoDB
connectDB();

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});

export default app;