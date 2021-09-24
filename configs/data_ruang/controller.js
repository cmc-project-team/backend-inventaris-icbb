const model = require('../../app/model');
const {StatusCodes} = require('http-status-codes');
const {success, noData, addSuccess, updateSuccess, deleteSuccess}= require('../../app/enum');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_ruang = await model.data_ruang.findAll({include:[model.data_person]});
        if (data_ruang.length > 0) {
          res.status(StatusCodes.OK).json({
            status: true,
            message: success,
            data: data_ruang
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
    const data_ruang = await model.data_ruang.findAll({include: [model.data_ruang],
        where: {
            kode: req.params.kode
        }
    })
    if (data_ruang.length > 0) {
      res.status(StatusCodes.OK).json({
        status: true,
        message: success,
        data: data_ruang
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
      const data_ruang = await model.data_ruang.create({
          kode: req.body.kode,
          code: req.body.code,
          nama: req.body.nama,
          person: req.body.person,
      })
      res.status(StatusCodes.CREATED).json({
          message: addSuccess,
          data: data_ruang
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
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
      res.status(StatusCodes.OK).json({
          message: updateSuccess,
          data: data_ruang
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
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
          message: deleteSuccess,
          data: data_ruang
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

module.exports = controller;