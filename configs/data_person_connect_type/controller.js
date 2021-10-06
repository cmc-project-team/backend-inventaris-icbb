const model = require('../../app/model');
const {StatusCodes} = require('http-status-codes');
const {success, noData, addSuccess, updateSuccess, deleteSuccess, failed, getData}= require('../../app/enum');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_person_connect_type = await model.data_person_connect_type.findAll({include: [model.data_person, model.data_person_type]});
        if (data_person_connect_type.length > 0) {
          res.status(StatusCodes.OK).json({
            status: success,
            message: getData,
            data: data_person_connect_type
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
    const data_person_connect_type = await model.data_person_connect_type.findAll({ include: [model.data_person, model.data_person_type],
        where: {
            kode: req.params.kode
        }
    })
    if (data_person_connect_type.length > 0) {
      res.status(StatusCodes.OK).json({
        status: success,
        message: getData,
        data: data_person_connect_type
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
      const data_person_connect_type = await model.data_person_connect_type.create({
          kode: req.body.kode,
          person: req.body.person,
          person_type: req.body.person_type
      })
      res.status(StatusCodes.CREATED).json({
          status: success,
          message: addSuccess,
          data: data_person_connect_type
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
      const data_person_connect_type = await model.data_person_connect_type.update({
        kode: req.body.kode,
        person: req.body.person,
        person_type: req.body.person_type
      }, {
          where: {
              kode: req.params.kode
          }
      })
      const connect = await model.data_person_connect_type.findOne({include: [model.data_person, model.data_person_type],
        where: {
            kode: req.params.kode
        }
      })
      res.status(StatusCodes.OK).json({
          status: success,
          message: updateSuccess,
          data: connect
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
      const data_person_connect_type = await model.data_person_connect_type.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          status: success,
          message: deleteSuccess,
          data: data_person_connect_type
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          status: failed,
          message: error.message
      })
  }
};

module.exports = controller;