const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const userController =require('../controllers/userController');
const utileControler = require('../controllers/uttile');

const verify = require('../controllers/verify');

router.post('/login',authController.userLogin);
router.post('/register',authController.userReg);

router.post('/booking',verify.userVerify,userController.addBooking);
router.get('/all-booking',verify.userVerify,userController.getAllBooking);
router.delete('/cancel-booking',verify.userVerify,userController.cancelBooking);

router.get('/dept',verify.userVerify,utileControler.getDept);

router.get('/doctor',verify.userVerify,userController.getDoctor);

router.get('/report',verify.userVerify,userController.getReport);

router.get('/valid-report',verify.userVerify,userController.getValidReports);

module.exports = router;