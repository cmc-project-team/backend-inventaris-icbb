const model = require('../../app/model');
const {success, noData, addSuccess, updateSuccess, deleteSuccess}= require('../../app/enum');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_penghapusan = await model.data_penghapusan.findAll();
        if (data_penghapusan.length > 0) {
          res.status(StatusCodes.OK).json({
            status: true,
            message: success,
            data: data_penghapusan
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
    const data_penghapusan = await model.data_penghapusan.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (data_penghapusan.length > 0) {
      res.status(StatusCodes.OK).json({
        status: true,
        message: success,
        data: data_penghapusan
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
      const data_penghapusan = await model.data_penghapusan.create({
        kode: req.body.kode,
        code: req.body.code,
        inventaris: req.body.inventaris,
        alasan: req.body.alasan,
        status_penghapusan: req.body.status_penghapusan,
      })
      res.status(StatusCodes.CREATED).json({
          message: addSuccess,
          data: data_penghapusan
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_penghapusan = await model.data_penghapusan.update({
        kode: req.body.kode,
        code: req.body.code,
        inventaris: req.body.inventaris,
        alasan: req.body.alasan,
        status_penghapusan: req.body.status_penghapusan,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: updateSuccess,
          data: data_penghapusan
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_penghapusan = await model.data_penghapusan.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: deleteSuccess,
          data: data_penghapusan
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

module.exports = controller;