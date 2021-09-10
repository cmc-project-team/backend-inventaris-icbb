const express = require('express');
const router = express.Router();
const controller = require('../../app/controller');
const isAuth = require('../app_user/Auth');

router.get('/',isAuth, controller.data_daur_ulang.getAll);
router.get('/:kode',isAuth,controller.data_daur_ulang.getById);
router.post('/',isAuth, controller.data_daur_ulang.postData);
router.patch('/:kode',isAuth, controller.data_daur_ulang.updateData);
router.delete('/:kode',isAuth, controller.data_daur_ulang.deleteData);


module.exports = router;