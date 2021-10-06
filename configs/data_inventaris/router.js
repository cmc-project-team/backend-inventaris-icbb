const express = require('express');
const router = express.Router();
const controller = require('../../app/controller');
const isAuth = require('../app_user/Auth');


router.get('/',isAuth, controller.data_inventaris.getAll);
router.get('/:kode',isAuth,controller.data_inventaris.getById);
router.post('/',isAuth, controller.data_inventaris.postData);
router.patch('/:kode',isAuth, controller.data_inventaris.updateData);
router.delete('/:kode',isAuth, controller.data_inventaris.deleteData);


module.exports = router;