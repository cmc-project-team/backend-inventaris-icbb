const express = require('express');
const router = express.Router();
const controller = require('../../app/controller');
const isAuth = require('../app_user/Auth');

router.get('/',isAuth, controller.data_ruang.getAll);
router.get('/:kode',isAuth,controller.data_ruang.getById);
router.post('/',isAuth, controller.data_ruang.postData);
router.patch('/:kode',isAuth, controller.data_ruang.updateData);
router.delete('/:kode',isAuth, controller.data_ruang.deleteData);


module.exports = router;