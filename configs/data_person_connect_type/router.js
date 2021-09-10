const express = require('express');
const router = express.Router();
const controller = require('../../app/controller');
const isAuth = require('../app_user/Auth');

router.get('/',isAuth, controller.data_person_connect_type.getAll);
router.get('/:kode',isAuth,controller.data_person_connect_type.getById);
router.post('/',isAuth, controller.data_person_connect_type.postData);
router.patch('/:kode',isAuth, controller.data_person_connect_type.updateData);
router.delete('/:kode',isAuth, controller.data_person_connect_type.deleteData);


module.exports = router;