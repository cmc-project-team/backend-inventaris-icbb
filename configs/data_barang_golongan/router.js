const express = require('express');
const router = express.Router();
const controller = require('../../app/controller');
const isAuth = require('../app_user/Auth');

router.get('/',isAuth, controller.data_barang_golongan.getAll);
router.get('/:kode',isAuth , controller.data_barang_golongan.getById);
router.post('/',isAuth, controller.data_barang_golongan.postData);
router.patch('/:kode',isAuth, controller.data_barang_golongan.updateData);
router.delete('/:kode',isAuth, controller.data_barang_golongan.deleteData);


module.exports = router;