import express from 'express'
import { upload } from '../controllers/UploadController'

const router = express.Router()

router.post('/upload', upload)

export default router