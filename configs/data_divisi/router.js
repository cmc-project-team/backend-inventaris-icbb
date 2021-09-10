const express = require('express');
const router = express.Router();
const controller = require('../../app/controller');
const isAuth = require('../app_user/Auth');

router.get('/',isAuth, controller.data_divisi.getAll);
router.get('/:kode',isAuth,controller.data_divisi.getById);
router.post('/',isAuth, controller.data_divisi.postData);
router.patch('/:kode',isAuth, controller.data_divisi.updateData);
router.delete('/:kode',isAuth, controller.data_divisi.deleteData);


module.exports = router;