require('dotenv').config();
const model = require('../../app/model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passportJWT = require("passport-jwt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const {
  StatusCodes
} = require('http-status-codes');
const {
  success,
  noData,
  addSuccess,
  updateSuccess,
  deleteSuccess,
  emailAlready,
  noEmail,
  exCookie,
  err,
  errr,
  loginSuccess,
  worngPassword,
  noAuth,
  notDelete,
  failed,
  getData
} = require('../../app/enum');
const controller = {};

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

let strategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  let login = getUser({
    kode: jwt_payload.kode
  });
  if (err) {
    return done(err, false);
  }

  if (login) {
    return done(null, login);
  } else {
    return done(null, false);
  }
});

passport.use(strategy);

const getUser = async kode => {
  return await model.app_user.findOne({
    include: [model.data_divisi, model.app_jabatan],
    where: kode
  });
};

controller.login = async function (req, res, next) {
  try {

    const {
      email,
      password
    } = req.body;
    if (email && password) {
      let login = await getUser({
        email: email
      });
      if (!login) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: failed,
          message: noEmail
        });
      };

      const checkPassword = bcrypt.compareSync(password, login.password);
      if (checkPassword == true) {
        let payload = {
          kode: login.kode
        };
        let token = jwt.sign(payload, jwtOptions.secretOrKey, {
          expiresIn: '24h'
        });
        const limit = new Date(Date.now() + (1 * 3600000));
        res.cookie(exCookie, token, {
          httpOnly: true,
          expires: limit,
          maxAges: limit
        });
        res.json({
          status: success,
          message: loginSuccess,
          token: token,
          login
        });
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          status: failed,
          message: worngPassword
        });
      };
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({
        status: failed,
        message: noAuth
      });
    }

  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: error.message
    });
  }
}

controller.getAll = async function (req, res, next) {
  try {
    const app_user = await model.app_user.findAll({attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat', 'role', 'email'],include: [model.app_jabatan,model.data_divisi]
    });
    if (app_user.length > 0) {
      res.status(StatusCodes.OK).json({
        status: success,
        message: getData,
        data: app_user
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
    const app_user = await model.app_user.findAll({
      attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat', 'role', 'email'],include: [model.app_jabatan,model.data_divisi],
      where: {
        kode: req.params.kode
      }
    })
    if (app_user.length > 0) {
      res.status(StatusCodes.OK).json({
        status: success,
        message: getData,
        data: app_user
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
    const {
      password
    } = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
    const alreadyExistsUser = await model.app_user.findOne({
      where: {
        email: req.body.email
      }
    }).catch(
      (err) => {
        console.log(errr, err);
      }
    );

    if (alreadyExistsUser) {
      return res.status(StatusCodes.CONFLICT).json({
        status: failed,
        message: emailAlready
      });
    }

    const app_user = await model.app_user.create({
      kode: req.body.kode,
      nip: req.body.nip,
      nama: req.body.nama,
      jabatan: req.body.jabatan,
      divisi: req.body.divisi,
      no_hp: req.body.no_hp,
      email: req.body.email,
      password: hash,
      alamat: req.body.alamat,
      role: req.body.role,
    })
    res.status(StatusCodes.CREATED).json({
      status: success,
      message: addSuccess,
      data: app_user
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
    const app_user = await model.app_user.update({
      nip: req.body.nip,
      nama: req.body.nama,
      jabatan: req.body.jabatan,
      divisi: req.body.divisi,
      no_hp: req.body.no_hp,
      alamat: req.body.alamat,
      role: req.body.role,
    }, {
      where: {
        kode: req.params.kode
      }
    })
    const user = await model.app_user.findAll({attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat', 'role', 'email'],include: [model.app_jabatan,model.data_divisi],
      where: {
          kode: req.params.kode
      }
    })
    res.status(StatusCodes.OK).json({
      status: success,
      message: updateSuccess,
      data: user
    })
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: failed,
      message: error.message
    })
  }
};

controller.updateEmail = async function (req, res, next) {
  try {
    const {email, password} = req.body;
    const alreadyExistsUser = await model.app_user.findOne({ where: { email: req.body.email } }).catch(
      (err) => {
        console.log(errr, err);
      }
      );
      
      if (alreadyExistsUser) {
        return res.status(StatusCodes.CONFLICT).json({ message: emailAlready });
      }
      const update = await model.app_user.findOne({where: {kode: req.params.kode}});
      const checkPassword = bcrypt.compareSync(password, update.password); // true
      if(checkPassword == true){
      const app_user = await model.app_user.update({
        email
      }, {
          where: {
              kode: req.params.kode
          }
      })
        let user = await model.app_user.findOne({attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat', 'role', 'email'],include: [model.app_jabatan,model.data_divisi],
        where: {kode: req.params.kode}});
        res.status(StatusCodes.OK).json({
            status: success,
            message: updateSuccess,
            data: user
        })
      } else {
        res.status(StatusCodes.NOT_FOUND).json({
          status: failed,
          message: worngPassword
      })
      }
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          status: failed,
          message: error.message
      })
  }
};

controller.updatePassword = async function (req, res, next) {
  try {
    const {
      password, new_password
    } = req.body;
    const hash = bcrypt.hashSync(new_password, saltRounds);
    const update = await model.app_user.findOne({where: {kode: req.params.kode}});
    const checkPassword = bcrypt.compareSync(password, update.password); // true
    if(checkPassword == true){
      const app_user = await model.app_user.update({
         password: hash
      }, {
        where: {
          kode: req.params.kode
        }
      })
  
      const user = await model.app_user.findOne({ attributes: ['kode', 'nip', 'nama', 'jabatan','divisi','no_hp','alamat', 'role', 'email'],include: [model.app_jabatan,model.data_divisi],
        where: {
            kode: req.params.kode
        }
      })
      res.status(StatusCodes.OK).json({
        status: success,
        message: updateSuccess,
        data: user
      })
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        status: failed,
        message: worngPassword
      })
    }

  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: failed,
      message: error.message
    })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
    const user = await model.app_user.findOne({
      where: {
        kode: req.params.kode
      }
    });

    if (user.role != 1) {
      const app_user = await model.app_user.destroy({
        where: {
          kode: req.params.kode
        }
      })
      res.status(StatusCodes.OK).json({
        status: success,
        message: deleteSuccess,
        rowEffect: app_user
      })
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        status: failed,
        message: notDelete
      })
    }

  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: failed,
      message: error.message
    })
  }
};



module.exports = controller;