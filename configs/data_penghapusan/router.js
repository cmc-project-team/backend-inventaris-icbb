const express = require('express');
const router = express.Router();
const controller = require('../../app/controller');
const isAuth = require('../app_user/Auth');

router.get('/',isAuth, controller.data_penghapusan.getAll);
router.get('/:kode',isAuth,controller.data_penghapusan.getById);
router.post('/',isAuth, controller.data_penghapusan.postData);
router.patch('/:kode',isAuth, controller.data_penghapusan.updateData);
router.delete('/:kode',isAuth, controller.data_penghapusan.deleteData);


module.exports = router;