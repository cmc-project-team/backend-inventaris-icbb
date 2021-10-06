const model = require('../../app/model');
const Ruang =  model.data_ruang;
const Divisi =  model.data_divisi;
const divisi_ruang = model.data_divisi_ruang;
const {StatusCodes}= require('http-status-codes');
const { success, noData, addSuccess, updateSuccess, deleteSuccess, getData, failed } = require('../../app/enum');
const controller = {};

controller.getAll = async function (req, res , next) {
  try {
    const user = await model.app_user;
    const jabatan = await model.app_jabatan;
    const divisi = await model.data_divisi;
    const data_divisi_ruang = await model.data_divisi_ruang.findAll({include: [model.data_divisi, model.data_ruang, {model: user, include:[divisi, jabatan],attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat', 'role', 'email']}]});
    if (data_divisi_ruang.length > 0) {
      res.status(StatusCodes.OK).json({
        status: success,
        message: getData,
        data: data_divisi_ruang
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

// controller.getAll = async function (req, res , next) {
//   try {
//         const divisi = await Divisi.findAll({
//           include:[{
//             model: Ruang,
//             as: "data_ruangs",
//             through:{
//               attributes:[],
//             }, 
//           },],
//         });

//         if (divisi.length > 0) {
//           res.status(StatusCodes.OK).json({
//             status: success,
//             message: success,
//             divisi: divisi,
//           })
//         } else {
//           res.status(StatusCodes.OK).json({
//             status: success,
//             message: noData,
//             data: []
//           })
//         }
//   } catch (error) {
//     res.status(StatusCodes.NOT_FOUND).json({
//       status: failed,
//       message: error.message
//     })
//   };
// }

// controller.getById = async function (req, res, next) {
//   try {
//     const divisi = await Divisi.findAll({ where: {
//       kode: req.params.kode
//   },
//           include:[{
//             model: Ruang,
//             as: "data_ruangs",
//             through:{
//               attributes:[],
//             }
//           },],
//         });
//     if (divisi.length > 0) {
//       res.status(StatusCodes.CREATED).json({
//         status: success,
//         message: success,
//         data: divisi
//       })
//     } else {
//       res.status(StatusCodes.CREATED).json({
//         status: success,
//         message: noData,
//         data: []
//       })
//     }
//   } catch (error) {
//     res.status(StatusCodes.NOT_FOUND).json({
//       status: failed,
//       message: error.message
//     })
//   }
// };

controller.getById = async function (req, res, next) {
  try {
    const user = await model.app_user;
    const jabatan = await model.app_jabatan;
    const divisi = await model.data_divisi;
    const data_divisi_ruang = await model.data_divisi_ruang.findAll({include: [model.data_divisi, model.data_ruang, {model: user, include:[divisi, jabatan], attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat', 'role', 'email']}],
        where: {
            kode: req.params.kode
        }
    })
    if (data_divisi_ruang.length > 0) {
      res.status(StatusCodes.OK).json({
        status: success,
        message: getData,
        data: data_divisi_ruang
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
      const data_divisi_ruang = await model.data_divisi_ruang.create({
          kode: req.body.kode,
          divisi: req.body.divisi,
          ruang: req.body.ruang,
          person_penanggung_jawab: req.body.person_penanggung_jawab,
      })
      res.status(201).json({
          status: success,
          message: addSuccess,
          data: data_divisi_ruang
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
      const data_divisi_ruang = await model.data_divisi_ruang.update({
        code: req.body.code,
        divisi: req.body.divisi,
        ruang: req.body.ruang,
        person_penanggung_jawab: req.body.person_penanggung_jawab,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      const user = await model.app_user;
      const jabatan = await model.app_jabatan;
      const divisi = await model.data_divisi;
      const divisi_ruang = await model.data_divisi_ruang.findOne({include: [model.data_divisi, model.data_ruang, 
        {
          model: user,
          include: [divisi, jabatan],attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat']
        }],
        where: {
            kode: req.params.kode
        }
      })
      res.status(StatusCodes.OK).json({
          status: success,
          message: updateSuccess,
          data: divisi_ruang
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
      const data_divisi_ruang = await model.data_divisi_ruang.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          status: success,
          message: deleteSuccess,
          data: data_divisi_ruang
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          statusL: failed,
          message: error.message
      })
  }
};

module.exports = controller;