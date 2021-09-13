const model = require('../../app/model');
const {StatusCodes} = require('http-status-codes');
const {success, noData, addSuccess, updateSuccess, deleteSuccess} = require('../../app/enum');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_barang = await model.data_barang.findAll();
        if (data_barang.length > 0) {
          res.status(StatusCodes.OK).json({
            status: true,
            message: success,
            data: data_barang
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
    const data_barang = await model.data_barang.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (data_barang.length > 0) {
      res.status(StatusCodes.OK).json({
        status: true,
        message: success,
        data: data_barang
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
      const data_barang = await model.data_barang.create({
          kode: req.body.kode,
          nama: req.body.nama,
          golongan: req.body.golongan,
          code : req.body.code
      })
      res.status(StatusCodes.CREATED).json({
          message: addSuccess,
          data: data_barang
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_barang = await model.data_barang.update({
        nama: req.body.nama,
        golongan: req.body.golongan,
        code : req.body.code
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: updateSuccess,
          data: data_barang
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_barang = await model.data_barang.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: deleteSuccess,
          data: data_barang
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

module.exports = controller;