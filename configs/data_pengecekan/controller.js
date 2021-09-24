const model = require('../../app/model');
const {StatusCodes}= require('http-status-codes');
const {success, noData, addSuccess, updateSuccess, deleteSuccess}= require('../../app/enum');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_pengecekan = await model.data_pengecekan.findAll({include:[model.data_inventaris, model.data_person]});
        if (data_pengecekan.length > 0) {
          res.status(StatusCodes.OK).json({
            status: true,
            message: success,
            data: data_pengecekan
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
    const data_pengecekan = await model.data_pengecekan.findAll({include:[model.data_inventaris, model.data_person],
        where: {
            kode: req.params.kode
        }
    })
    if (data_pengecekan.length > 0) {
      res.status(StatusCodes.OK).json({
        status: true,
        message: success,
        data: data_pengecekan
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
      const data_pengecekan = await model.data_pengecekan.create({
          kode: req.body.kode,
          inventaris: req.body.inventaris,
          tanggal : req.body.tanggal,
          kondisi : req.body.kondisi,
          person_pengecek: req.body.person_pengecek,
      })
      res.status(StatusCodes.CREATED).json({
          message: addSuccess,
          data: data_pengecekan
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_pengecekan = await model.data_pengecekan.update({
        kode: req.body.kode,
        inventaris: req.body.inventaris,
        tanggal : req.body.tanggal,
        kondisi : req.body.kondisi,
        person_pengecek: req.body.person_pengecek,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: updateSuccess,
          data: data_pengecekan
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_pengecekan = await model.data_pengecekan.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: deleteSuccess,
          data: data_pengecekan
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

module.exports = controller;