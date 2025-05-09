const express = require('express');
const { 
    getAllUsers,
    getUserById, 
    createUser, 
    deleteUser, 
    loginUser, 
    approveUser
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);
router.patch('/:id/approve', approveUser);

module.exports = router;
