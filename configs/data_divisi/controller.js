const model = require('../../app/model');
const {StatusCodes}= require('http-status-codes');
const {success, noData, addSuccess, updateSuccess, deleteSuccess} = require('../../app/enum');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_divisi = await model.data_divisi.findAll();
        if (data_divisi.length > 0) {
          res.status(StatusCodes.OK).json({
            status: true,
            message: success,
            data: data_divisi
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
    const data_divisi = await model.data_divisi.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (data_divisi.length > 0) {
      res.status(StatusCodes.OK).json({
        status: true,
        message: success,
        data: data_divisi
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
      const data_divisi = await model.data_divisi.create({
          kode: req.body.kode,
          code: req.body.code,
          nama: req.body.nama,
          person_penanggung_jawab: req.body.person_penanggung_jawab,
          batas_pengecekan_awal: req.body.batas_pengecekan_awal,
          batas_pengecekan_akhir: req.body.batas_pengecekan_akhir,
      })
      res.status(StatusCodes.CREATED).json({
          message: addSuccess,
          data: data_divisi
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_divisi = await model.data_divisi.update({
        code: req.body.code,
        nama: req.body.nama,
        person_penanggung_jawab: req.body.person_penanggung_jawab,
        batas_pengecekan_awal: req.body.batas_pengecekan_awal,
        batas_pengecekan_akhir: req.body.batas_pengecekan_akhir,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: updateSuccess,
          data: data_divisi
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_divisi = await model.data_divisi.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: deleteSuccess,
          data: data_divisi
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

module.exports = controller;