const model = require('../../app/model');
const {StatusCodes} = require('http-status-codes');
const {success, noData, addSuccess, updateSuccess, deleteSuccess, getData, failed} = require('../../app/enum');
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
    const data_daur_ulang = await model.data_daur_ulang.findAll({include: 
    [
      {
        model: inventaris, as: 'lama', 
          include: 
          [
            model.data_barang,
            {
              model: person, 
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
              include: [divisi, jabatan],attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat']
            }
          ]
      },
      {
        model: inventaris, as: 'baru', 
          include: 
          [
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
              include: [divisi, jabatan],attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat', 'role', 'email']
            }
          ]
      }
    ]
}
);
    if (data_daur_ulang.length > 0) {
      res.status(StatusCodes.OK).json({
        status: success,
        message: getData,
        data: data_daur_ulang
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
    const data_daur_ulang = await model.data_daur_ulang.findAll({
      include: 
      [
        {
          model: inventaris, as: 'lama', 
            include: 
            [
              model.data_barang,
              {
                model: person, 
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
                include: [divisi, jabatan],attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat']
              }
            ]
        },
        {
          model: inventaris, as: 'baru', 
            include: 
            [
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
                include: [divisi, jabatan],attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat']
              }
            ]
        }
      ],
        where: {
            kode: req.params.kode
        }
    })
    if (data_daur_ulang.length > 0) {
      res.status(StatusCodes.OK).json({
        status: success,
        message: getData,
        data: data_daur_ulang
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
      const data_daur_ulang = await model.data_daur_ulang.create({
          kode: req.body.kode,
          inventaris_lama: req.body.inventaris_lama,
          inventaris_baru: req.body.inventaris_baru,
          tanggal: req.body.tanggal,
      })
      res.status(201).json({
          status: success,
          message: addSuccess,
          data: data_daur_ulang
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const data_daur_ulang = await model.data_daur_ulang.update({
        kode: req.body.kode,
        inventaris_lama: req.body.inventaris_lama,
        inventaris_baru: req.body.inventaris_baru,
        tanggal: req.body.tanggal,
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
      const daur_ulang = await model.data_daur_ulang.findOne({ include: 
        [
          {
            model: inventaris, as: 'lama', 
              include: 
              [
                model.data_barang,
                {
                  model: person, 
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
                  include: [divisi, jabatan],attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat']
                }
              ]
          },
          {
            model: inventaris, as: 'baru', 
              include: 
              [
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
                  include: [divisi, jabatan],attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat']
                }
              ]
          }
        ],
        where: {
            kode: req.params.kode
        }
      })
      res.status(StatusCodes.OK).json({
          status: success,
          message: updateSuccess,
          data: daur_ulang
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const data_daur_ulang = await model.data_daur_ulang.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: deleteSuccess,
          data: data_daur_ulang
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

module.exports = controller;