import express from 'express';
import createItem from './create';
import editItem from './edit';
import deleteItem from './delete';
import viewItems from './view';

const router = express.Router();
router.get('/', viewItems);
router.post('/', createItem);
router.put('/', editItem);
router.delete('/', deleteItem);

export default router;