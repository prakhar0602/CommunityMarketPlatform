const express = require('express');
const { handleAddUser, handleVerifyToken, handleLogin, handleLogout, handleGetAllUsers, handleGetUser, updateUser } = require('../controllers/auth');
const { validateSignup, validateLogin } = require('../middlewares/authSchema');
const router = express.Router();

router.post('/register_user',validateSignup,handleAddUser );


// router.get('/verify_token',refreshToken, handleVerifyToken)


router.post('/login',validateLogin, handleLogin); 
router.post('/updateUser',updateUser);
router.get('/getAllUsers',handleGetAllUsers);
router.get('/getUser',handleGetUser);
router.get('/verifyToken',handleVerifyToken);
router.get('/logout', handleLogout);

module.exports = router;