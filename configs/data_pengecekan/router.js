const express = require('express');
const router = express.Router();
const controller = require('../../app/controller');
const isAuth = require('../app_user/Auth');

router.get('/',isAuth, controller.data_pengecekan.getAll);
router.get('/:kode',isAuth,controller.data_pengecekan.getById);
router.post('/',isAuth, controller.data_pengecekan.postData);
router.patch('/:kode',isAuth, controller.data_pengecekan.updateData);
router.delete('/:kode',isAuth, controller.data_pengecekan.deleteData);


module.exports = router;