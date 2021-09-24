const express = require('express');
const router = express.Router();
const controller = require('../../app/controller');

router.get('/', controller.app_user.getAll);
router.get('/:kode',controller.app_user.getById);
router.post('/', controller.app_user.postData);
router.post('/login', controller.app_user.login);
router.patch('/:kode', controller.app_user.updateData);
router.patch('/email/:kode', controller.app_user.updateEmail);
router.patch('/password/:kode', controller.app_user.updatePassword);
router.delete('/:kode', controller.app_user.deleteData);


module.exports = router;