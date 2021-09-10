const model = require('../../app/model');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_person = await model.data_person.findAll();
        if (data_person.length > 0) {
          res.status(200).json({
            status: true,
            message: 'Get Method data_person',
            data: data_person
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
    const data_person = await model.data_person.findAll({ 
        where: {
            kode: req.params.kode
        }
    })
    if (data_person.length > 0) {
      res.status(200).json({
        status: true,
        message: 'Get Method data_person',
        data: data_person
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
      const data_person = await model.data_person.create({
          kode: req.body.kode,
          nama: req.body.nama,
          alamat: req.body.alamat,
          no_telp: req.body.no_telp,
      })
      res.status(201).json({
          message: "data_person berhasil ditambahkan",
          data: data_person
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_person = await model.data_person.update({
        kode: req.body.kode,
        nama: req.body.nama,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(200).json({
          message: "data_person berhasil di update",
          data: data_person
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_person = await model.data_person.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(200).json({
          message: "data_person berhasil di delete",
          data: data_person
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
};

module.exports = controller;