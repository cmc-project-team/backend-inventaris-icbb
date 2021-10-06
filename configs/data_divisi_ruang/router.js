const express = require('express');
const router = express.Router();
const controller = require('../../app/controller');
const isAuth = require('../app_user/Auth');


router.get('/',isAuth, controller.data_divisi_ruang.getAll);
router.get('/:kode',isAuth,controller.data_divisi_ruang.getById);
router.post('/',isAuth, controller.data_divisi_ruang.postData);
router.patch('/:kode',isAuth, controller.data_divisi_ruang.updateData);
router.delete('/:kode',isAuth, controller.data_divisi_ruang.deleteData);


module.exports = router;