/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/posts';
const router = express.Router();

router.post('/api/robots/closest', controller.postPayload);

export default router;
