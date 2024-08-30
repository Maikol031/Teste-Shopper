import express from 'express';
import { UploadController } from '../controllers/UploadController';

const router = express.Router();

const uploadController = new UploadController();

router.post('/upload', uploadController.create);
router.patch('/upload', uploadController.confirm);
router.get('/upload/:customer_code', uploadController.list);

export default router;