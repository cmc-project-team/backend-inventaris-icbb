const model = require('../../app/model');
const {StatusCodes} = require('http-status-codes');
const { success, noData, addSuccess, updateSuccess, deleteSuccess } = require('../../app/enum');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_barang_golongan = await model.data_barang_golongan.findAll();
        if (data_barang_golongan.length > 0) {
          res.status(StatusCodes.OK).json({
            status: true,
            message: success,
            data: data_barang_golongan
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
    const data_barang_golongan = await model.data_barang_golongan.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (data_barang_golongan.length > 0) {
      res.status(StatusCodes.OK).json({
        status: true,
        message: success,
        data: data_barang_golongan
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
      const data_barang_golongan = await model.data_barang_golongan.create({
          kode: req.body.kode,
          code: req.body.code,
          nama: req.body.nama,
      })
      res.status(StatusCodes.CREATED).json({
          message: addSuccess,
          data: data_barang_golongan
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_barang_golongan = await model.data_barang_golongan.update({
        code: req.body.code,
        nama: req.body.nama,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: updateSuccess,
          data: data_barang_golongan
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_barang_golongan = await model.data_barang_golongan.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: deleteSuccess,
          data: data_barang_golongan
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

module.exports = controller;