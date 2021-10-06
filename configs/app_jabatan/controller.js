const model = require('../../app/model');
const {success, noData, addSuccess, updateSuccess, deleteSuccess, getData} = require('../../app/enum');
const {StatusCodes} = require('http-status-codes');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const app_jabatan = await model.app_jabatan.findAll();
        if (app_jabatan.length > 0) {
          res.status(StatusCodes.OK).json({
            status: success,
            message: getData,
            data: app_jabatan
          })
        } else {
          res.status(StatusCodes.OK).json({
            status: success,
            message: noData,
            data: []
          })
        }
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: false,
      message: error.message
    })
  };
}

controller.getById = async function (req, res, next) {
  try {
    const app_jabatan = await model.app_jabatan.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (app_jabatan.length > 0) {
      res.status(StatusCodes.OK).json({
        status: success,
        message: getData,
        data: app_jabatan
      })
    } else {
      res.status(StatusCodes.OK).json({
        status: success,
        message: noData,
        data: []
      })
    }
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: false,
      message: error.message
    })
  }
};

controller.postData = async function (req, res, next) {
  try {
      const app_jabatan = await model.app_jabatan.create({
          kode: req.body.kode,
          nama: req.body.nama,
      })
      res.status(StatusCodes.CREATED).json({
          message: addSuccess,
          data: app_jabatan
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const app_jabatan = await model.app_jabatan.update({
        nama: req.body.nama,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      const jabatan = await model.app_jabatan.findAll({
        where: {
            kode: req.params.kode
        }
      })
      res.status(StatusCodes.OK).json({
          message: updateSuccess,
          data: jabatan
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const app_jabatan = await model.app_jabatan.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: deleteSuccess,
          data: app_jabatan
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

module.exports = controller;