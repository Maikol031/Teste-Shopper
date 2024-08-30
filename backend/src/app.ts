import express from 'express';
import router from './routes/uploadRoutes';
import cors from 'cors';
import path from 'path';
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use('/files', express.static(path.join(__dirname, 'uploads')))
app.use('/api', router);

export { app };