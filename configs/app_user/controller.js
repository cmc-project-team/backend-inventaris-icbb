require('dotenv').config();
const model = require('../../app/model');
const bcrypt = require('bcrypt');
const passportJWT = require("passport-jwt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const {StatusCodes} = require('http-status-codes');
const {success, noData, addSuccess, updateSuccess, deleteSuccess, emailAlready, noEmail, exCookie, err, errr, loginSuccess, worngPassword, noAuth} = require('../../app/enum');
const controller = {};

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

let strategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  let login = getUser({ kode: jwt_payload.kode });
  if (err){
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
    where: kode
  });
};

controller.getAll = async function (req, res , next) {
  try {
        const app_user = await model.app_user.findAll();
        if (app_user.length > 0) {
          res.status(StatusCodes.OK).json({
            status: true,
            message: success,
            data: app_user
          })
        } else {
          res.status(StatusCodes.OK).json({
            status: true,
            message: noData,
            data: []
          })
        }
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: false,
      message: error.message
    })
  };
}

controller.getById = async function (req, res, next) {
  try {
    const app_user = await model.app_user.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (app_user.length > 0) {
      res.status(StatusCodes.OK).json({
        status: true,
        message: success,
        data: app_user
      })
    } else {
      res.status(StatusCodes.OK).json({
        status: true,
        message: noData,
        data: []
      })
    }
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: false,
      message: error.message
    })
  }
};

controller.postData = async function (req, res, next) {
  try {
    const alreadyExistsUser = await model.app_user.findOne({ where: { email: req.body.email } }).catch(
      (err) => {
        console.log(errr, err);
      }
      );
      
      if (alreadyExistsUser) {
        return res.status(409).json({ message: emailAlready });
      }
    // const hash = await bcrypt.hash(req.body.password, 10);
  

    const app_user = await model.app_user.create({
        kode: req.body.kode,
        nip: req.body.nip,
        nama: req.body.nama,
        jabatan: req.body.jabatan,
        no_hp: req.body.no_hp,
        email: req.body.email,
        password: req.body.password,
        alamat: req.body.alamat,
        role: req.body.role,
    })  
    res.status(StatusCodes.CREATED).json({
        message: addSuccess,
        data: app_user
    })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  };
};


controller.updateData = async function (req, res, next) {
  try {
      const app_user = await model.app_user.update({
        kode: req.body.kode,
        nip: req.body.nip,
        nama: req.body.nama,
        jabatan: req.body.jabatan,
        no_hp: req.body.no_hp,
        email: req.body.email,
        password: req.body.password,
        alamat: req.body.alamat,
        role: req.body.role,
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: updateSuccess,
          data: app_user
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

controller.deleteData = async function (req, res, next) {
  try {
      const app_user = await model.app_user.destroy({
          where: {
              kode: req.params.kode
          }
      })
      res.status(StatusCodes.OK).json({
          message: deleteSuccess,
          data: app_user
      })
  } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
      })
  }
};

controller.login = async function (req, res, next) {
  try {

    
    const {email, password} = req.body;
    
    if(email && password) {
      let login = await getUser({email: email});
      // print("signin");
      if(!login){
        return res.status(StatusCodes.BAD_REQUEST).json({ message: noEmail});
      };
      
      delete login.password;

      if(login.password ===  password) {
        let payload = { kode: login.kode};
        
        let token = jwt.sign( payload, jwtOptions.secretOrKey,{expiresIn: '24h'} );
        const limit = new Date(Date.now() + (1 * 3600000));
        res.cookie(exCookie, token, {
          httpOnly: true,
          expires: limit,
          maxAges: limit
        });
        res.json({ message: loginSuccess, token: token });
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: worngPassword});
      };
    } else{
      res.status(StatusCodes.UNAUTHORIZED).json({ message: noAuth});
    }

  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message});
  }
}

module.exports = controller;