const model = require('../../app/model');
const {StatusCodes} = require('http-status-codes');
const {success, noData, addSuccess, updateSuccess, deleteSuccess, failed, getData}= require('../../app/enum');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_person = await model.data_person.findAll();
        if (data_person.length > 0) {
          res.status(StatusCodes.OK).json({
            status: success,
            message: getData,
            data: data_person
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
    const data_person = await model.data_person.findAll({ 
        where: {
            kode: req.params.kode
        }
    })
    if (data_person.length > 0) {
      res.status(StatusCodes.OK).json({
        status: success,
        message: getData,
        data: data_person
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
      const data_person = await model.data_person.create({
          kode: req.body.kode,
          nama: req.body.nama,
          alamat: req.body.alamat,
          no_telp: req.body.no_telp,
      })
      res.status(StatusCodes.CREATED).json({
          status: success,
          message: addSuccess,
          data: data_person
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
      const data_person = await model.data_person.update({
        kode: req.body.kode,
        nama: req.body.nama,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      const person = await model.data_person.findAll({
        where: {
            kode: req.params.kode
        }
      })
      res.status(StatusCodes.OK).json({
          status: success,
          message: updateSuccess,
          data: person
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
      const data_person = await model.data_person.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          status: success,
          message: deleteSuccess,
          data: data_person
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          status: failed,
          message: error.message
      })
  }
};

module.exports = controller;