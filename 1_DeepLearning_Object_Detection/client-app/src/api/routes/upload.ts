import express from 'express';
import {uploadService} from '../services/upload.service';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const result = await uploadService.uploadImage(req.body);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
