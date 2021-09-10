const model = require('../../app/model');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_riwayat_pelimpahan = await model.data_riwayat_pelimpahan.findAll();
        if (data_riwayat_pelimpahan.length > 0) {
          res.status(200).json({
            status: true,
            message: 'Get Method data_riwayat_pelimpahan',
            data: data_riwayat_pelimpahan
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
    const data_riwayat_pelimpahan = await model.data_riwayat_pelimpahan.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (data_riwayat_pelimpahan.length > 0) {
      res.status(200).json({
        status: true,
        message: 'Get Method data_riwayat_pelimpahan',
        data: data_riwayat_pelimpahan
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
      const data_riwayat_pelimpahan = await model.data_riwayat_pelimpahan.create({
          kode: req.body.kode,
          inventaris: req.body.inventaris,
          tanggal: req.body.tanggal,
          divisi: req.body.divisi,
          ruang: req.body.ruang,
      })
      res.status(201).json({
          message: "data_riwayat_pelimpahan berhasil ditambahkan",
          data: data_riwayat_pelimpahan
      })
  } catch (error) {
      res.status(404).json({
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
      res.status(200).json({
          message: "data_riwayat_pelimpahan berhasil di update",
          data: data_riwayat_pelimpahan
      })
  } catch (error) {
      res.status(404).json({
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
      res.status(200).json({
          message: "data_riwayat_pelimpahan berhasil di delete",
          data: data_riwayat_pelimpahan
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
};

module.exports = controller;