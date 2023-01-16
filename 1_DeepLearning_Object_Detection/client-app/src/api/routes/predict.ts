import express from 'express'
import {predictService} from '../services/predict.service'

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const imageData = req.body.imageData;
        const predictedValue = await predictService.predict(imageData);
        res.status(200).send(predictedValue);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

export default router;
