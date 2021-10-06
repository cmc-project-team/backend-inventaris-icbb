const model = require('../../app/model');
const {StatusCodes} = require('http-status-codes');
const {success, noData, addSuccess, updateSuccess, deleteSuccess, failed, getData}= require('../../app/enum');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
    const inventaris = await model.data_inventaris;
    const divisi_ruang = await model.data_divisi_ruang;
    const divisi = await model.data_divisi;
    const ruang = await model.data_ruang;
    const pencatat = await model.app_user;
    const jabatan = await model.app_jabatan;
    const person = await model.data_person;
    const data_riwayat_pelimpahan = await model.data_riwayat_pelimpahan.findAll({include:[{model: inventaris, include: [
      model.data_barang,
    {
      model: person, 
      as: 'donatur'
    },
      model.data_divisi,
    {
      model: divisi_ruang,
      include: [divisi, ruang, {model: pencatat, include:[divisi, jabatan],attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat', 'role', 'email']}]
    },
    {
      model: divisi,
      as: 'pemilik'
    },
    {
      model: pencatat,
      include: [divisi, jabatan],
      attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat', 'role', 'email']
    }
  ]}, model.data_divisi, model.data_ruang]});
    if (data_riwayat_pelimpahan.length > 0) {
      res.status(StatusCodes.OK).json({
        status: success,
        message: getData,
        data: data_riwayat_pelimpahan
      })
    } else {
      res.status(StatusCodes.OK).json({
        status: success,
        message: noData,
        data: []
      })
    }
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: failed,
      message: error.message
    })
  };
}

controller.getById = async function (req, res, next) {
  try {
    const inventaris = await model.data_inventaris;
    const divisi_ruang = await model.data_divisi_ruang;
    const divisi = await model.data_divisi;
    const ruang = await model.data_ruang;
    const pencatat = await model.app_user;
    const jabatan = await model.app_jabatan;
    const person = await model.data_person;
    const data_riwayat_pelimpahan = await model.data_riwayat_pelimpahan.findAll({include:[{model: inventaris, include: [
      model.data_barang,
    {
      model: person, 
      as: 'donatur'
    },
      model.data_divisi,
    {
      model: divisi_ruang,
      include: [divisi, ruang, {model: pencatat, include:[divisi, jabatan],attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat', 'role', 'email']}]
    },
    {
      model: divisi,
      as: 'pemilik'
    },
    {
      model: pencatat,
      include: [divisi, jabatan],
      attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat', 'role', 'email']
    }
  ]}, model.data_divisi, model.data_ruang],
        where: {
            kode: req.params.kode
        }
    })
    if (data_riwayat_pelimpahan.length > 0) {
      res.status(StatusCodes.OK).json({
        status: success,
        message: getData,
        data: data_riwayat_pelimpahan
      })
    } else {
      res.status(StatusCodes.OK).json({
        status: success,
        message: noData,
        data: []
      })
    }
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: failed,
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
      res.status(StatusCodes.CREATED).json({
          status: success,
          message: addSuccess,
          data: data_riwayat_pelimpahan
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          status: failed,
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
      const inventaris = await model.data_inventaris;
      const divisi_ruang = await model.data_divisi_ruang;
      const divisi = await model.data_divisi;
      const ruang = await model.data_ruang;
      const pencatat = await model.app_user;
      const jabatan = await model.app_jabatan;
      const person = await model.data_person;
      const pelimpahan = await model.data_riwayat_pelimpahan.findAll({include:[{model: inventaris, include: [
        model.data_barang,
      {
        model: person, 
        as: 'donatur'
      },
        model.data_divisi,
      {
        model: divisi_ruang,
        include: [divisi, ruang, {model: pencatat, include:[divisi, jabatan],attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat', 'role', 'email']}]
      },
      {
        model: divisi,
        as: 'pemilik'
      },
      {
        model: pencatat,
        include: [divisi, jabatan],
        attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat', 'role', 'email']
      }
    ]}, model.data_divisi, model.data_ruang],
        where: {
            kode: req.params.kode
        }
      })
      res.status(StatusCodes.OK).json({
          status: success,
          message: updateSuccess,
          data: pelimpahan
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          status: failed,
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
      res.status(StatusCodes.OK).json({
          status: success,
          message: deleteSuccess,
          data: data_riwayat_pelimpahan
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          status: failed,
          message: error.message
      })
  }
};

module.exports = controller;