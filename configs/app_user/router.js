const express = require('express');
const router = express.Router();
const controller = require('../../app/controller');
const isAuth = require('../app_user/Auth');

router.get('/',isAuth, controller.app_user.getAll);
router.get('/:kode',isAuth,controller.app_user.getById);
router.post('/', controller.app_user.postData);
router.post('/login', controller.app_user.login);
router.patch('/:kode', controller.app_user.updateData);
router.patch('/:kode/email',isAuth, controller.app_user.updateEmail);
router.patch('/:kode/password',isAuth, controller.app_user.updatePassword);
router.delete('/:kode',isAuth, controller.app_user.deleteData);


module.exports = router;