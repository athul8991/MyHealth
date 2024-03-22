const express = require('express');
const router = express.Router();

const auth =require('../controllers/authController');
const verify = require('../controllers/verify')
const doctorController = require('../controllers/doctorController');



router.post('/login' , auth.doctorLogin);

router.post('/pass-change' , verify.doctorVerify , auth.doctorChange);

router.post('/schedule' , verify.doctorVerify , doctorController.addSchedule);
router.get('/schedule' , verify.doctorVerify , doctorController.getSchedule);
router.delete('/schedule' , verify.doctorVerify , doctorController.deleteSchedule);

router.get('/user' , verify.doctorVerify , doctorController.getUser);

router.post('/report' , verify.doctorVerify , doctorController.addReport);
router.get('/report' , verify.doctorVerify , doctorController.getReport);


module.exports = router;