const model = require('../../app/model');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_barang = await model.data_barang.findAll();
        if (data_barang.length > 0) {
          res.status(200).json({
            status: true,
            message: 'Get Method data_barang',
            data: data_barang
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
    const data_barang = await model.data_barang.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (data_barang.length > 0) {
      res.status(200).json({
        status: true,
        message: 'Get Method data_barang',
        data: data_barang
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
      const data_barang = await model.data_barang.create({
          kode: req.body.kode,
          nama: req.body.nama,
          golongan: req.body.golongan,
          code : req.body.code
      })
      res.status(201).json({
          message: "data_barang berhasil ditambahkan",
          data: data_barang
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_barang = await model.data_barang.update({
        kode: req.body.kode,
        nama: req.body.nama,
        golongan: req.body.golongan,
        code : req.body.code
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(200).json({
          message: "data_barang berhasil di update",
          data: data_barang
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_barang = await model.data_barang.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(200).json({
          message: "data_barang berhasil di delete",
          data: data_barang
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
};

module.exports = controller;