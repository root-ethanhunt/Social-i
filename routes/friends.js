const express = require('express');

const router = express.Router();
const friendsController = require('../controllers/friendship_controller');


router.get('/toggle', friendsController.toggleFollow);


module.exports = router;