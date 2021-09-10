const model = require('../../app/model');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const app_jabatan = await model.app_jabatan.findAll();
        if (app_jabatan.length > 0) {
          res.status(200).json({
            status: true,
            message: 'Get Method app_jabatan',
            data: app_jabatan
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
    const app_jabatan = await model.app_jabatan.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (app_jabatan.length > 0) {
      res.status(200).json({
        status: true,
        message: 'Get Method app_jabatan',
        data: app_jabatan
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
      const app_jabatan = await model.app_jabatan.create({
          kode: req.body.kode,
          nama: req.body.nama,
      })
      res.status(201).json({
          message: "app_jabatan berhasil ditambahkan",
          data: app_jabatan
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const app_jabatan = await model.app_jabatan.update({
        kode: req.body.kode,
        nama: req.body.nama,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(200).json({
          message: "app_jabatan berhasil di update",
          data: app_jabatan
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const app_jabatan = await model.app_jabatan.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(200).json({
          message: "app_jabatan berhasil di delete",
          data: app_jabatan
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
};

module.exports = controller;