const express = require('express');
const router = express.Router();
const controller = require('../../app/controller');
const isAuth = require('../app_user/Auth');

router.get('/',isAuth, controller.data_person.getAll);
router.get('/:kode',isAuth,controller.data_person.getById);
router.post('/',isAuth, controller.data_person.postData);
router.patch('/:kode',isAuth, controller.data_person.updateData);
router.delete('/:kode',isAuth, controller.data_person.deleteData);


module.exports = router;