const express = require('express');
const router = express.Router();
const controller = require('../../app/controller');
const isAuth = require('../app_user/Auth');

router.get('/',isAuth, controller.data_peminjaman.getAll);
router.get('/:kode',isAuth,controller.data_peminjaman.getById);
router.post('/',isAuth, controller.data_peminjaman.postData);
router.patch('/:kode',isAuth, controller.data_peminjaman.updateData);
router.delete('/:kode',isAuth, controller.data_peminjaman.deleteData);


module.exports = router;