const express =  require('express');
const homeController = require('../../controllers/home/index');
const router = express.Router();

// const Movie = require('../../model/movies');

router.get('/', homeController.index);

module.exports = router;
