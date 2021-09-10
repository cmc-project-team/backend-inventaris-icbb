const express = require('express');
const router = express.Router();
const controller = require('../../app/controller');
const isAuth = require('../app_user/Auth');

router.get('/',isAuth, controller.app_jabatan.getAll);
router.get('/:kode',isAuth,controller.app_jabatan.getById);
router.post('/',isAuth, controller.app_jabatan.postData);
router.patch('/:kode',isAuth, controller.app_jabatan.updateData);
router.delete('/:kode',isAuth, controller.app_jabatan.deleteData);


module.exports = router;