const model = require('../../app/model');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_ruang = await model.data_ruang.findAll();
        if (data_ruang.length > 0) {
          res.status(200).json({
            status: true,
            message: 'Get Method data_ruang',
            data: data_ruang
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
    const data_ruang = await model.data_ruang.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (data_ruang.length > 0) {
      res.status(200).json({
        status: true,
        message: 'Get Method data_ruang',
        data: data_ruang
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
      const data_ruang = await model.data_ruang.create({
          kode: req.body.kode,
          code: req.body.code,
          nama: req.body.nama,
          person: req.body.person,
      })
      res.status(201).json({
          message: "data_ruang berhasil ditambahkan",
          data: data_ruang
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_ruang = await model.data_ruang.update({
        kode: req.body.kode,
        nama: req.body.nama,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(200).json({
          message: "data_ruang berhasil di update",
          data: data_ruang
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_ruang = await model.data_ruang.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(200).json({
          message: "data_ruang berhasil di delete",
          data: data_ruang
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
};

module.exports = controller;