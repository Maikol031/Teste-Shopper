import express from 'express';
import router from './routes/uploadRoutes';
import cors from 'cors';
const app = express();

app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use('/api', router);

export {app};