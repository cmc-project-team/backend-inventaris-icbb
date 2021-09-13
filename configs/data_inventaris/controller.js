const model = require('../../app/model');
const {StatusCodes}= require('http-status-codes');
const {success, noData, addSuccess, updateSuccess, deleteSuccess}= require('../../app/enum');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_inventaris = await model.data_inventaris.findAll();
        if (data_inventaris.length > 0) {
          res.status(StatusCodes.OK).json({
            status: true,
            message: success,
            data: data_inventaris
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
    const data_inventaris = await model.data_inventaris.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (data_inventaris.length > 0) {
      res.status(StatusCodes.OK).json({
        status: true,
        message: success,
        data: data_inventaris
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
      const data_inventaris = await model.data_inventaris.create({
          kode: req.body.kode,
          code: req.body.code,
          barang: req.body.barang,
          harga: req.body.harga,
          person_donatur: req.body.person_donatur,
          divisi: req.body.divisi,
          ruang: req.body.ruang,
          kepemilikan: req.body.kepemilikan,
          kondisi: req.body.kondisi,
          status_lokasi: req.body.status_lokasi,
          dokumen: req.body.dokumen,
          person_pencatat: req.body.person_pencatat,
          tanggal_masuk: req.body.tanggal_masuk,
      })
      res.status(StatusCodes>CREATED).json({
          message: addSuccess,
          data: data_inventaris
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_inventaris = await model.data_inventaris.update({
        code: req.body.code,
        barang: req.body.barang,
        harga: req.body.harga,
        person_donatur: req.body.person_donatur,
        divisi: req.body.divisi,
        ruang: req.body.ruang,
        kepemilikan: req.body.kepemilikan,
        kondisi: req.body.kondisi,
        status_lokasi: req.body.status_lokasi,
        dokumen: req.body.dokumen,
        person_pencatat: req.body.person_pencatat,
        tanggal_masuk: req.body.tanggal_masuk,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: updateSuccess,
          data: data_inventaris
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_inventaris = await model.data_inventaris.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: deleteSuccess,
          data: data_inventaris
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

module.exports = controller;