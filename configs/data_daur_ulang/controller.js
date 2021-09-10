const model = require('../../app/model');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_daur_ulang = await model.data_daur_ulang.findAll();
        if (data_daur_ulang.length > 0) {
          res.status(200).json({
            status: true,
            message: 'Get Method data_daur_ulang',
            data: data_daur_ulang
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
    const data_daur_ulang = await model.data_daur_ulang.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (data_daur_ulang.length > 0) {
      res.status(200).json({
        status: true,
        message: 'Get Method data_daur_ulang',
        data: data_daur_ulang
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
      const data_daur_ulang = await model.data_daur_ulang.create({
          kode: req.body.kode,
          inventaris_lama: req.body.inventaris_lama,
          inventaris_baru: req.body.inventaris_baru,
          tanggal: req.body.tanggal,
      })
      res.status(201).json({
          message: "data_daur_ulang berhasil ditambahkan",
          data: data_daur_ulang
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_daur_ulang = await model.data_daur_ulang.update({
        kode: req.body.kode,
        inventaris_lama: req.body.inventaris_lama,
        inventaris_baru: req.body.inventaris_baru,
        tanggal: req.body.tanggal,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(200).json({
          message: "data_daur_ulang berhasil di update",
          data: data_daur_ulang
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_daur_ulang = await model.data_daur_ulang.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(200).json({
          message: "data_daur_ulang berhasil di delete",
          data: data_daur_ulang
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
};

module.exports = controller;