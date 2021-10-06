const model = require('../../app/model');
const {StatusCodes} = require('http-status-codes');
const {success, noData, addSuccess, updateSuccess, deleteSuccess, failed, getData}= require('../../app/enum');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_ruang = await model.data_ruang.findAll();
        if (data_ruang.length > 0) {
          res.status(StatusCodes.OK).json({
            status: success,
            message: getData,
            data: data_ruang
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
      status: failed,
      message: error.message
    })
  };
}

controller.getById = async function (req, res, next) {
  try {
    const data_ruang = await model.data_ruang.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (data_ruang.length > 0) {
      res.status(StatusCodes.OK).json({
        status: success,
        message: getData,
        data: data_ruang
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
      status: failed,
      message: error.message
    })
  }
};

controller.postData = async function (req, res, next) {
  try {
      const data_ruang = await model.data_ruang.create({
          kode: req.body.kode,
          code: req.body.code,
          nama: req.body.nama,
      })
      res.status(StatusCodes.CREATED).json({
          status: success,
          message: addSuccess,
          data: data_ruang
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          status: failed,
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_ruang = await model.data_ruang.update({
        kode: req.body.kode,
        nama: req.body.nama,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      const ruang = await model.data_ruang.findAll({
        where: {
            kode: req.params.kode
        }
      })
      res.status(StatusCodes.OK).json({
          status: success,
          message: updateSuccess,
          data: ruang
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          status: failed,
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_ruang = await model.data_ruang.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          status: success,
          message: deleteSuccess,
          data: data_ruang
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          status: failed,
          message: error.message
      })
  }
};

module.exports = controller;