const model = require('../../app/model');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_penghapusan = await model.data_penghapusan.findAll();
        if (data_penghapusan.length > 0) {
          res.status(200).json({
            status: true,
            message: 'Get Method data_penghapusan',
            data: data_penghapusan
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
    const data_penghapusan = await model.data_penghapusan.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (data_penghapusan.length > 0) {
      res.status(200).json({
        status: true,
        message: 'Get Method data_penghapusan',
        data: data_penghapusan
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
      const data_penghapusan = await model.data_penghapusan.create({
        kode: req.body.kode,
        code: req.body.code,
        inventaris: req.body.inventaris,
        alasan: req.body.alasan,
        status_penghapusan: req.body.status_penghapusan,
      })
      res.status(201).json({
          message: "data_penghapusan berhasil ditambahkan",
          data: data_penghapusan
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_penghapusan = await model.data_penghapusan.update({
        kode: req.body.kode,
        code: req.body.code,
        inventaris: req.body.inventaris,
        alasan: req.body.alasan,
        status_penghapusan: req.body.status_penghapusan,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(200).json({
          message: "data_penghapusan berhasil di update",
          data: data_penghapusan
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_penghapusan = await model.data_penghapusan.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(200).json({
          message: "data_penghapusan berhasil di delete",
          data: data_penghapusan
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
};

module.exports = controller;