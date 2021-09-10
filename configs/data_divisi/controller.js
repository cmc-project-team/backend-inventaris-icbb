const model = require('../../app/model');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
        const data_divisi = await model.data_divisi.findAll();
        if (data_divisi.length > 0) {
          res.status(200).json({
            status: true,
            message: 'Get Method data_divisi',
            data: data_divisi
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
    const data_divisi = await model.data_divisi.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (data_divisi.length > 0) {
      res.status(200).json({
        status: true,
        message: 'Get Method data_divisi',
        data: data_divisi
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
      const data_divisi = await model.data_divisi.create({
          kode: req.body.kode,
          code: req.body.code,
          nama: req.body.nama,
          person_penanggung_jawab: req.body.person_penanggung_jawab,
          batas_pengecekan_awal: req.body.batas_pengecekan_awal,
          batas_pengecekan_akhir: req.body.batas_pengecekan_akhir,
      })
      res.status(201).json({
          message: "data_divisi berhasil ditambahkan",
          data: data_divisi
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_divisi = await model.data_divisi.update({
        kode: req.body.kode,
        code: req.body.code,
        nama: req.body.nama,
        person_penanggung_jawab: req.body.person_penanggung_jawab,
        batas_pengecekan_awal: req.body.batas_pengecekan_awal,
        batas_pengecekan_akhir: req.body.batas_pengecekan_akhir,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(200).json({
          message: "data_divisi berhasil di update",
          data: data_divisi
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_divisi = await model.data_divisi.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(200).json({
          message: "data_divisi berhasil di delete",
          data: data_divisi
      })
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
};

module.exports = controller;