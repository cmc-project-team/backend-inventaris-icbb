require('dotenv').config();
const jwt = require("jsonwebtoken");
const model = require('../../app/model');
const {StatusCodes} = require('http-status-codes');
const { noAuth } = require('../../app/enum');

const isAuth = async(req, res, next) => {
    // const auth = req.cookies["expresscookie"];
    // console.log(cookies);
    var can_go = false;
    // if(auth != null){
        try {
            const token = req.headers.authorization.split(" ") [1];
            const data = jwt.verify(token, process.env.JWT_SECRET);
            const kode = data.kode;
            const user = await model.app_user.findOne({
                where : {
                    kode: kode
                }
            })
            console.log(user, data);
            if (user != null && user.kode == kode) {
                can_go = true;
            }
            // console.log("berhasil",data,user)
        } catch (e) {
            console.log(e);
        }
    // } 
    
    
    if (can_go) {
        next();
    } else {
        res.status(StatusCodes.NOT_FOUND).json({
            message: noAuth
        })
    }
}

module.exports = isAuth;