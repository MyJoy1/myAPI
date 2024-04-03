const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

const { 
    registerUser, 
    loginUser, 
    currentUser,
    logoutUser 
} = require("../controllers/userController");


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', validateToken, logoutUser);
router.get('/current', validateToken, currentUser);

module.exports = router;