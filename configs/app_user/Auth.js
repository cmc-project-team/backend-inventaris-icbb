require('dotenv').config();
const jwt = require("jsonwebtoken");
const model = require('../../app/model');
const {StatusCodes} = require('http-status-codes');
const { noAuth } = require('../../app/enum');

const isAuth = async(req, res, next) => {
    var can_go = false;
        try {
            const token = req.headers.authorization.split(" ") [1];
            const data = jwt.verify(token, process.env.JWT_SECRET);
            const kode = data.kode;
            const user = await model.app_user.findOne({include: [model.data_divisi, model.app_jabatan],
                where : {
                    kode: kode
                }
            })
            console.log(user, data);
            if (user != null && user.kode == kode) {
                can_go = true;
                req.session.user = user;
            }
        } catch (e) {
            console.log(e);
        }
        
    if (can_go) {
        next();
    } else {
        res.status(StatusCodes.NOT_FOUND).json({
            message: noAuth
        })
    }
}

module.exports = isAuth;