const model = require('../../app/model');
const {StatusCodes}= require('http-status-codes');
const {success, noData, addSuccess, updateSuccess, deleteSuccess, getData, failed} = require('../../app/enum');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_divisi = await model.data_divisi.findAll();
        if (data_divisi.length > 0) {
          res.status(StatusCodes.OK).json({
            status: success,
            message: getData,
            data: data_divisi
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
    const data_divisi = await model.data_divisi.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (data_divisi.length > 0) {
      res.status(StatusCodes.OK).json({
        status: success,
        message: getData,
        data: data_divisi
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
      const data_divisi = await model.data_divisi.create({
          kode: req.body.kode,
          code: req.body.code,
          nama: req.body.nama,
          batas_pengecekan_awal: req.body.batas_pengecekan_awal,
          batas_pengecekan_akhir: req.body.batas_pengecekan_akhir,
      });
      res.status(StatusCodes.CREATED).json({
          status: success,
          message: addSuccess,
          data: data_divisi
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
      const data_divisi = await model.data_divisi.update({
        code: req.body.code,
        nama: req.body.nama,
        batas_pengecekan_awal: req.body.batas_pengecekan_awal,
        batas_pengecekan_akhir: req.body.batas_pengecekan_akhir,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      const divisi = await model.data_divisi.findAll({
        where: {
            kode: req.params.kode
        }
      })
      res.status(StatusCodes.OK).json({
          status: success,
          message: updateSuccess,
          data: divisi
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
      const data_divisi = await model.data_divisi.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          status: success,
          message: deleteSuccess,
          data: data_divisi
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          status: failed,
          message: error.message
      })
  }
};

module.exports = controller;