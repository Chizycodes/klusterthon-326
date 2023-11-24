import express from 'express';
import { getUser, getUsers, updateUser, deleteUser, createUser } from '../controllers/users.js';
import User from '../mongodb/models/user.js';

const router = express.Router({ mergeParams: true });

import { protect } from '../middleware/auth.js';

router.use(protect);

router.route('/').get(User, getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default router;
