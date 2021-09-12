const model = require('../../app/model');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_barang_golongan = await model.data_barang_golongan.findAll();
        if (data_barang_golongan.length > 0) {
          res.status(200).json({
            status: true,
            message: 'Get Method data_barang_golongan',
            data: data_barang_golongan
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
    const data_barang_golongan = await model.data_barang_golongan.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (data_barang_golongan.length > 0) {
      res.status(200).json({
        status: true,
        message: 'Get Method data_barang_golongan',
        data: data_barang_golongan
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
      const data_barang_golongan = await model.data_barang_golongan.create({
          kode: req.body.kode,
          code: req.body.code,
          nama: req.body.nama,
      })
      res.status(201).json({
          message: "data_barang_golongan berhasil ditambahkan",
          data: data_barang_golongan
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_barang_golongan = await model.data_barang_golongan.update({
        code: req.body.code,
        nama: req.body.nama,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(200).json({
          message: "data_barang_golongan berhasil di update",
          data: data_barang_golongan
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_barang_golongan = await model.data_barang_golongan.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(200).json({
          message: "data_barang_golongan berhasil di delete",
          data: data_barang_golongan
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
};

module.exports = controller;