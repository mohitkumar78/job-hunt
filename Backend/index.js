import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import Db_Connect from './Utils/Db.js';  // Correct path and syntax for default import
import userrouter from './Router/user.route.js';
import companyrouter from './Router/Company.route.js';
import jobrouter from './Router/job.route.js';
import ApplicationRoute from './Router/Application.route.js';
import path from 'path';

const app = express();
const _dirname = path.resolve();
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
    origin: "http://localhost:5173",  // Update this for production if needed
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
};

app.use(cors(corsOptions));

// Define API routes
app.use("/api/v1/user", userrouter);
app.use("/api/v2/company", companyrouter);
app.use("/api/v3/jobs", jobrouter);
app.use("/api/v4/application", ApplicationRoute);

// Serve static files from the frontend build
app.use(express.static(path.join(_dirname, '/frontend/dist')));

// Serve the frontend index.html file for any non-API routes
app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// Start the server
const port = process.env.PORT || 5000;  // Default to port 5000 if not set
app.listen(port, () => {
    Db_Connect();  // Connect to the database
    console.log(`App is running on port ${port}`);
});
