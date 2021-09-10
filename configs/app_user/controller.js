const model = require('../../app/model');
const bcrypt = require('bcrypt');
const passportJWT = require("passport-jwt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const controller = {};

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "secret";

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
          res.status(200).json({
            status: true,
            message: 'Get Method app_user',
            data: app_user
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
    const app_user = await model.app_user.findAll({
        where: {
            kode: req.params.kode
        }
    })
    if (app_user.length > 0) {
      res.status(200).json({
        status: true,
        message: 'Get Method app_user',
        data: app_user
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
    const alreadyExistsUser = await model.app_user.findOne({ where: { email: req.body.email } }).catch(
      (err) => {
        console.log("Error: ", err);
      }
      );
      
      if (alreadyExistsUser) {
        return res.status(409).json({ message: "User with email already exists!" });
      }
    // const hash = await bcrypt.hash(req.body.password, 10);
  

    const app_user = await model.app_user.create({
        kode: req.body.kode,
        nip: req.body.nip,
        nama: req.body.nama,
        jabatan: req.body.jabatan,
        divisi: req.body.divisi,
        no_hp: req.body.no_hp,
        email: req.body.email,
        password: req.body.password,
        alamat: req.body.alamat
    })  
    res.status(201).json({
        message: "app_user berhasil ditambahkan",
        data: app_user
    })
  } catch (error) {
      res.status(404).json({
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
        divisi: req.body.divisi,
        no_hp: req.body.no_hp,
        email: req.body.email,
        password: req.body.password,
        alamat: req.body.alamat
      }, {
          where: {
              kode: req.params.kode
          }
      })
      res.status(200).json({
          message: "app_user berhasil di update",
          data: app_user
      })
  } catch (error) {
      res.status(404).json({
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
      res.status(200).json({
          message: "app_user berhasil di delete",
          data: app_user
      })
  } catch (error) {
      res.status(404).json({
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
        return res.status(401).json({ message: "Email belum terdaftar"});
      };
      
      delete login.password;

      if(login.password ===  password) {
        let payload = { kode: login.kode, email: login.email };
        
        let token = jwt.sign( payload, jwtOptions.secretOrKey,{expiresIn: '1h'} );
        const limit = new Date(Date.now() + (1 * 3600000));
        res.cookie("expresscookie", token, {
          httpOnly: true,
          expires: limit,
          maxAges: limit
        });
        res.json({ message: "oke", token: token });
      } else {
        res.status(401).json({ message: "password salah "});
      };
    } else{
      res.status(400).json({ message: "Auth salah "});
    }

  } catch (error) {
    res.status(400).json({ message: error.message});
  }
}

module.exports = controller;