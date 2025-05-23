const express = require('express');
const { 
    getAllUsers,
    getUserByUsername, 
    createUser, 
    deleteUser, 
    loginUser, 
    approveUser,
    promoteUser,
    demoteUser,
} = require('../controllers/userController');

const router = express.Router();

router.get('/getAll', getAllUsers);
router.post('/getUser', getUserByUsername);
router.post('/create', createUser);
router.delete('/delete', deleteUser);
router.post('/login', loginUser);
router.patch('/approve', approveUser);
router.patch('/promote', promoteUser);
router.patch('/demote', demoteUser)

module.exports = router;
