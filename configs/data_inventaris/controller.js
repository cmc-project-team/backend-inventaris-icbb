const model = require('../../app/model');
const {StatusCodes}= require('http-status-codes');
const {success, noData, addSuccess, updateSuccess, deleteSuccess, getData, failed}= require('../../app/enum');
const controller = {};


controller.getAll = async function (req, res , next) {
  try {
    const divisi_ruang = await model.data_divisi_ruang;
    const divisi = await model.data_divisi;
    const ruang = await model.data_ruang;
    const pencatat = await model.app_user;
    const jabatan = await model.app_jabatan;
    const person = await model.data_person;
    
      const inventaris = await model.data_inventaris.findAll({include: [
          model.data_barang,
        {
          model: person, 
          as: 'donatur'
        },
          model.data_divisi,
        {
          model: divisi_ruang,
          include: [divisi, ruang, {model: pencatat, include:[divisi, jabatan], attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat', 'role', 'email']}]
        },
        {
          model: divisi,
          as: 'pemilik'
        },
        {
          model: pencatat,
          include: [divisi, jabatan],attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat']
        }
      ]
      })
        if (inventaris.length > 0) {
          res.status(StatusCodes.OK).json({
            status: success,
            message: getData,
            data: inventaris
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
    const divisi_ruang = await model.data_divisi_ruang;
    const divisi = await model.data_divisi;
    const ruang = await model.data_ruang;
    const pencatat = await model.app_user;
    const jabatan = await model.app_jabatan;
    const person = await model.data_person;
  
    const inventaris = await model.data_inventaris.findAll({include: [
      model.data_barang,
      {
        model: person, 
        as: 'donatur'
      },
        model.data_divisi,
      {
        model: divisi_ruang,
        include: [divisi, ruang, {model: pencatat, include:[divisi, jabatan],
          attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat', 'role', 'email']
        }]
      },
      {
        model: divisi,
        as: 'pemilik'
      },
      {
        model: pencatat,
        include: [divisi, jabatan],attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat']
      }
    ],
      where: {
          kode: req.params.kode
      }
    })
    if (inventaris.length > 0) {
      res.status(StatusCodes.OK).json({
        status: success,
        message: getData,
        data: inventaris
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
    const data_inventaris = await model.data_inventaris.create({
        kode: req.body.kode,
        code: req.body.code,
        barang: req.body.barang,
        harga: req.body.harga,
        person_donatur: req.body.person_donatur,
        divisi: req.body.divisi,
        lokasi: req.body.lokasi,
        kepemilikan: req.body.kepemilikan,
        kondisi: req.body.kondisi,
        dokumen: req.body.dokumen,
        person_pencatat: req.body.person_pencatat,
        tanggal_masuk: req.body.tanggal_masuk,
    })
    res.status(StatusCodes.CREATED).json({
        status: success,
        message: addSuccess,
        data: data_inventaris
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
      const data_inventaris = await model.data_inventaris.update({
        code: req.body.code,
        barang: req.body.barang,
        harga: req.body.harga,
        person_donatur: req.body.person_donatur,
        divisi: req.body.divisi,
        lokasi: req.body.lokasi,
        kepemilikan: req.body.kepemilikan,
        kondisi: req.body.kondisi,
        dokumen: req.body.dokumen,
        person_pencatat: req.body.person_pencatat,
        tanggal_masuk: req.body.tanggal_masuk,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      // data_divisi_ruang
      const divisi_ruang = await model.data_divisi_ruang;
      const divisi = await model.data_divisi;
      const ruang = await model.data_ruang;
      const pencatat = await model.app_user;
      const jabatan = await model.app_jabatan;
      const person = await model.data_person;
    
      const inventaris = await model.data_inventaris.findAll({include: [
        model.data_barang,
        {
          model: person, 
          as: 'donatur'
        },
          model.data_divisi,
        {
          model: divisi_ruang,
          include: [divisi, ruang, {model: pencatat, include:[divisi, jabatan], attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat', 'role', 'email']}]
        },
        {
          model: divisi,
          as: 'pemilik'
        },
        {
          model: pencatat,
          include: [divisi, jabatan],attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat']
        }
      ],
        where: {
            kode: req.params.kode
        }
      })
      res.status(StatusCodes.OK).json({
          status: success,
          message: updateSuccess,
          data: inventaris,
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
      const data_inventaris = await model.data_inventaris.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          status: success,
          message: deleteSuccess,
          data: data_inventaris
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          status: failed,
          message: error.message
      })
  }
};

module.exports = controller;