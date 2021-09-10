const express = require('express');
const router = express.Router();
const controller = require('../../app/controller');
const isAuth = require('../app_user/Auth');

router.get('/',isAuth, controller.data_barang.getAll);
router.get('/:kode',isAuth, controller.data_barang.getById);
router.post('/',isAuth, controller.data_barang.postData);
router.patch('/:kode',isAuth, controller.data_barang.updateData);
router.delete('/:kode',isAuth, controller.data_barang.deleteData);


module.exports = router;