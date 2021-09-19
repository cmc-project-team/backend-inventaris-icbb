const model = require('../../app/model');
const {StatusCodes}= require('http-status-codes');
const { success, noData, addSuccess, updateSuccess, deleteSuccess } = require('../../app/enum');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_divisi_ruang = await model.data_divisi_ruang.findAll();
        if (data_divisi_ruang.length > 0) {
          res.status(StatusCodes.OK).json({
            status: true,
            message: success,
            data: data_divisi_ruang
          })
        } else {
          res.status(StatusCodes.CREATED).json({
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
    const data_divisi_ruang = await model.data_divisi_ruang.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (data_divisi_ruang.length > 0) {
      res.status(StatusCodes.CREATED).json({
        status: true,
        message: success,
        data: data_divisi_ruang
      })
    } else {
      res.status(StatusCodes.CREATED).json({
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
      const data_divisi_ruang = await model.data_divisi_ruang.CREATED({
          kode: req.body.kode,
          divisi: req.body.divisi,
          ruang: req.body.ruang,
          person_penanggung_jawab: req.body.person_penanggung_jawab,
      })
      res.status(201).json({
          message: addSuccess,
          data: data_divisi_ruang
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_divisi_ruang = await model.data_divisi_ruang.update({
        code: req.body.code,
        divisi: req.body.divisi,
        ruang: req.body.ruang,
        person_penanggung_jawab: req.body.person_penanggung_jawab,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.CREATED).json({
          message: updateSuccess,
          data: data_divisi_ruang
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_divisi_ruang = await model.data_divisi_ruang.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.CREATED).json({
          message: deleteSuccess,
          data: data_divisi_ruang
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

module.exports = controller;