const model = require('../../app/model');
const {StatusCodes}= require('http-status-codes');
const {success, noData, addSuccess, updateSuccess, deleteSuccess, getData, failed}= require('../../app/enum');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
    const barang = await model.data_barang;
    const golongan = await model.data_barang_golongan;
    const data_peminjaman = await model.data_peminjaman.findAll({include:[{model:barang, include: [golongan] }, model.data_person]});
    if (data_peminjaman.length > 0) {
      res.status(StatusCodes.OK).json({
        status: success,
        message: getData,
        data: data_peminjaman
      })
    } else {
      res.status(StatusCodes.OK).json({
        status: success,
        message: noData,
        data: []
      })
    }
  } catch (error) {
    res.status(404).json({
      status: failed,
      message: error.message
    })
  };
}

controller.getById = async function (req, res, next) {
  try {
    const barang = await model.data_barang;
    const golongan = await model.data_barang_golongan;
    const data_peminjaman = await model.data_peminjaman.findAll({include:[{model:barang, include: [golongan] }, model.data_person],
        where: {
            kode: req.params.kode
        }
    })
    if (data_peminjaman.length > 0) {
      res.status(StatusCodes.OK).json({
        status: success,
        message: getData,
        data: data_peminjaman
      })
    } else {
      res.status(StatusCodes.OK).json({
        status: success,
        message: noData,
        data: []
      })
    }
  } catch (error) {
    res.status(404).json({
      status: failed,
      message: error.message
    })
  }
};

controller.postData = async function (req, res, next) {
  try {
      const data_peminjaman = await model.data_peminjaman.create({
          kode: req.body.kode,
          code: req.body.code,
          tanggal_pinjam: req.body.tanggal_pinjam,
          tanggal_kembali: req.body.tanggal_kembali,
          barang: req.body.barang,
          kondisi_pinjam: req.body.kondisi_pinjam,
          kondisi_kembali: req.body.kondisi_kembali,
          dokumen: req.body.dokumen,
          person_peminjam: req.body.person_peminjam,
      })
      res.status(201).json({
          message: addSuccess,
          data: data_peminjaman
      })
  } catch (error) {
      res.status(404).json({
          status: failed,
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_peminjaman = await model.data_peminjaman.update({
        kode: req.body.kode,
        code: req.body.code,
        tanggal_pinjam: req.body.tanggal_pinjam,
        tanggal_kembali: req.body.tanggal_kembali,
        barang: req.body.barang,
        kondisi_pinjam: req.body.kondisi_pinjam,
        kondisi_kembali: req.body.kondisi_kembali,
        dokumen: req.body.dokumen,
        person_peminjam: req.body.person_peminjam,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      const barang = await model.data_barang;
      const golongan = await model.data_barang_golongan;
      const peminjaman = await model.data_peminjaman.findAll({include:[{model:barang, include: [golongan] }, model.data_person],
        where: {
            kode: req.params.kode
        }
      })
      res.status(StatusCodes.OK).json({
          status: success,
          message: updateSuccess,
          data: peminjaman
      })
  } catch (error) {
      res.status(404).json({
          status: failed,
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_peminjaman = await model.data_peminjaman.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          status: success,
          message: deleteSuccess,
          data: data_peminjaman
      })
  } catch (error) {
      res.status(404).json({
          status: failed,
          message: error.message
      })
  }
};

module.exports = controller;