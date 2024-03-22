const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');
const utileController = require('../controllers/uttile')

const verify = require('../controllers/verify')

router.post('/login',authController.adminLogin);
router.post('/register',authController.adminReg);

router.get('/doctor',verify.adminVerify,utileController.getDoctor);
router.post('/doctor',verify.adminVerify,adminController.addDoctor);
router.delete('/doctor',verify.adminVerify,adminController.deleteDoctor);

router.get('/department',verify.adminVerify,utileController.getDept) // common
router.post('/department',verify.adminVerify,adminController.addDept)
router.delete('/department',verify.adminVerify,adminController.deleteDept)


module.exports = router;
