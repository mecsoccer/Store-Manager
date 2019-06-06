import express from 'express';
import botController from '../controllers/slackBotController';

const router = express.Router();

router.post('/progress-manager', botController);

module.exports = router;
