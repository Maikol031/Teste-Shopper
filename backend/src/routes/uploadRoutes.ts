import express from 'express'
import { UploadController } from '../controllers/UploadController'

const router = express.Router()

const uploadController = new UploadController();

router.post('/upload', uploadController.create)

export default router