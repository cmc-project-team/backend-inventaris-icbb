const model = require('../../app/model');
const {StatusCodes} = require('http-status-codes');
const {success, noData, addSuccess, updateSuccess, deleteSuccess}= require('../../app/enum');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_riwayat_pelimpahan = await model.data_riwayat_pelimpahan.findAll();
        if (data_riwayat_pelimpahan.length > 0) {
          res.status(StatusCodes.OK).json({
            status: true,
            message: success,
            data: data_riwayat_pelimpahan
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
    const data_riwayat_pelimpahan = await model.data_riwayat_pelimpahan.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (data_riwayat_pelimpahan.length > 0) {
      res.status(StatusCodes.OK).json({
        status: true,
        message: success,
        data: data_riwayat_pelimpahan
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
      const data_riwayat_pelimpahan = await model.data_riwayat_pelimpahan.create({
          kode: req.body.kode,
          inventaris: req.body.inventaris,
          tanggal: req.body.tanggal,
          divisi: req.body.divisi,
          ruang: req.body.ruang,
      })
      res.status(StatusCodes.CREATED).json({
          message: addSuccess,
          data: data_riwayat_pelimpahan
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_riwayat_pelimpahan = await model.data_riwayat_pelimpahan.update({
        kode: req.body.kode,
        inventaris: req.body.inventaris,
        tanggal: req.body.tanggal,
        divisi: req.body.divisi,
        ruang: req.body.ruang,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: updateSuccess,
          data: data_riwayat_pelimpahan
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_riwayat_pelimpahan = await model.data_riwayat_pelimpahan.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: deleteSuccess,
          data: data_riwayat_pelimpahan
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

module.exports = controller;