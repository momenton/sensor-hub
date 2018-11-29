import { Router } from 'express';
import wrap from 'express-async-handler';
import controller from '../controllers/sensor';

const router = new Router();

/**
 * /sensors
 */
router.get('/', wrap(controller.fetchAll));
/**
 * /sensors/:id
 */
router.get('/:id', wrap(controller.findById));
/**
 * /sensors/:id
 */
router.put('/:id', wrap(controller.update));
/**
 * /sensors
 */
router.post('/', wrap(controller.register));

module.exports = router;
