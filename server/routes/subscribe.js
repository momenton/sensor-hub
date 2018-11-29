import { Router } from 'express';
import wrap from 'express-async-handler';
import controller from '../controllers/subscribe';

const router = new Router();

/**
 * /subscribe
 */
router.post('/', wrap(controller.subscribe));

module.exports = router;
