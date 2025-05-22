const express = require('express');
const { 
    getAllUsers,
    getUserByUsername, 
    createUser, 
    deleteUser, 
    loginUser, 
    approveUser,
} = require('../controllers/userController');

const router = express.Router();

router.get('/get', getAllUsers);
router.get('/getUsername', getUserByUsername);
router.post('/create', createUser);
router.delete('/delete', deleteUser);
router.post('/login', loginUser);
router.patch('/approve', approveUser);

module.exports = router;
