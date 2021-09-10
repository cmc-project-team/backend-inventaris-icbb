const model = require('../../app/model');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_person_type = await model.data_person_type.findAll();
        if (data_person_type.length > 0) {
          res.status(200).json({
            status: true,
            message: 'Get Method data_person_type',
            data: data_person_type
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
    const data_person_type = await model.data_person_type.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (data_person_type.length > 0) {
      res.status(200).json({
        status: true,
        message: 'Get Method data_person_type',
        data: data_person_type
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
      const data_person_type = await model.data_person_type.create({
          kode: req.body.kode,
          nama: req.body.nama,
      })
      res.status(201).json({
          message: "data_person_type berhasil ditambahkan",
          data: data_person_type
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_person_type = await model.data_person_type.update({
        kode: req.body.kode,
        nama: req.body.nama,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(200).json({
          message: "data_person_type berhasil di update",
          data: data_person_type
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_person_type = await model.data_person_type.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(200).json({
          message: "data_person_type berhasil di delete",
          data: data_person_type
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
};

module.exports = controller;