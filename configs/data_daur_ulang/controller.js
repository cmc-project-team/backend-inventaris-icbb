const model = require('../../app/model');
const {StatusCodes} = require('http-status-codes');
const {success, noData, addSuccess, updateSuccess, deleteSuccess} = require('../../app/enum');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_daur_ulang = await model.data_daur_ulang.findAll({include: [model.data_inventaris]});
        if (data_daur_ulang.length > 0) {
          res.status(StatusCodes.OK).json({
            status: true,
            message: success,
            data: data_daur_ulang
          })
        } else {
          res.status(StatusCodes.OK).json({
            status: true,
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
  const data_daur_ulang = await model.data_daur_ulang.findAll({
    include: [model.data_inventaris],
        where: {
            kode: req.params.kode
        }
    })
    if (data_daur_ulang.length > 0) {
      res.status(StatusCodes.OK).json({
        status: true,
        message: success,
        data: data_daur_ulang
      })
    } else {
      res.status(StatusCodes.OK).json({
        status: true,
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
      const data_daur_ulang = await model.data_daur_ulang.create({
          kode: req.body.kode,
          inventaris_lama: req.body.inventaris_lama,
          inventaris_baru: req.body.inventaris_baru,
          tanggal: req.body.tanggal,
      })
      res.status(201).json({
          message: addSuccess,
          data: data_daur_ulang
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_daur_ulang = await model.data_daur_ulang.update({
        kode: req.body.kode,
        inventaris_lama: req.body.inventaris_lama,
        inventaris_baru: req.body.inventaris_baru,
        tanggal: req.body.tanggal,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: updateSuccess,
          data: data_daur_ulang
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_daur_ulang = await model.data_daur_ulang.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: deleteSuccess,
          data: data_daur_ulang
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

module.exports = controller;