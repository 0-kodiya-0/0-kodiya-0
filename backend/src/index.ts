import express, { Request, Response, NextFunction } from 'express';
import { authRouter, projectsRouter } from './routes/index.js';
import { projectsDb } from './database/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { config } from 'dotenv';
import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables first
config();

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Ensure the data directory exists
const dataDir = join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Load the database
async function initializeDB(): Promise<void> {
    try {
        await projectsDb.read();
        console.log('Database loaded successfully');
    } catch (error) {
        console.error('Error loading database:', error);
        // If there's an error reading the database, initialize it with default data
        await projectsDb.write();
        console.log('Created new database with default data');
    }
}

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/projects', projectsRouter);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
});

// Error handling middleware
interface CustomError extends Error {
    status?: number;
}

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Start the server
initializeDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

export default app;