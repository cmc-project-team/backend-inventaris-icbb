const model = require('../../app/model');
const {StatusCodes} = require('http-status-codes');
const {success, noData, addSuccess, updateSuccess, deleteSuccess}= require('../../app/enum');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_person_type = await model.data_person_type.findAll();
        if (data_person_type.length > 0) {
          res.status(StatusCodes.OK).json({
            status: true,
            message: success,
            data: data_person_type
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
    const data_person_type = await model.data_person_type.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (data_person_type.length > 0) {
      res.status(StatusCodes.OK).json({
        status: true,
        message: success,
        data: data_person_type
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
      const data_person_type = await model.data_person_type.create({
          kode: req.body.kode,
          nama: req.body.nama,
      })
      res.status(StatusCodes.CREATED).json({
          message: addSuccess,
          data: data_person_type
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_person_type = await model.data_person_type.update({
        kode: req.body.kode,
        nama: req.body.nama,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: updateSuccess,
          data: data_person_type
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_person_type = await model.data_person_type.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: deleteSuccess,
          data: data_person_type
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

module.exports = controller;