const express = require('express');

const router = express.Router();
const friendsController = require('../controllers/friendship_controller');


router.post('/toggle', friendsController.toggleFollow);


module.exports = router;