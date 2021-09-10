const express = require('express');
const router = express.Router();
const controller = require('../../app/controller');
const isAuth = require('../app_user/Auth');

router.get('/',isAuth, controller.data_riwayat_pelimpahan.getAll);
router.get('/:kode',isAuth,controller.data_riwayat_pelimpahan.getById);
router.post('/',isAuth, controller.data_riwayat_pelimpahan.postData);
router.patch('/:kode',isAuth, controller.data_riwayat_pelimpahan.updateData);
router.delete('/:kode',isAuth, controller.data_riwayat_pelimpahan.deleteData);


module.exports = router;