import express from 'express';
import controller from '../controllers/user.controller';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/auth/validate', extractJWT, controller.validateToken);
router.post('/auth/register', controller.register);
router.post('/auth/login', controller.login);

export = router;
