const model = require('../../app/model');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_inventaris = await model.data_inventaris.findAll();
        if (data_inventaris.length > 0) {
          res.status(200).json({
            status: true,
            message: 'Get Method data_inventaris',
            data: data_inventaris
          })
        } else {
          res.status(200).json({
            status: true,
            message: 'Tidak ada Data',
            data: []
          })
        }
  } catch (error) {
    res.status(404).json({
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
      res.status(200).json({
        status: true,
        message: 'Get Method data_inventaris',
        data: data_inventaris
      })
    } else {
      res.status(200).json({
        status: true,
        message: 'Tidak ada Data',
        data: []
      })
    }
  } catch (error) {
    res.status(404).json({
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
      res.status(201).json({
          message: "data_inventaris berhasil ditambahkan",
          data: data_inventaris
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_inventaris = await model.data_inventaris.update({
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
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(200).json({
          message: "data_inventaris berhasil di update",
          data: data_inventaris
      })
  } catch (error) {
      res.status(404).json({
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
      res.status(200).json({
          message: "data_inventaris berhasil di delete",
          data: data_inventaris
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
};

module.exports = controller;