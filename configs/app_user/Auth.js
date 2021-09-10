const jwt = require("jsonwebtoken");
const model = require('../../app/model');

const isAuth = async(req, res, next) => {
    // const auth = req.cookies["expresscookie"];
    // console.log(cookies);
    var can_go = false;
    // if(auth != null){
        try {
            const token = req.headers.authorization.split(" ") [1];
            const data = jwt.verify(token,"secret");
            const kode = data.kode;
            const user = await model.app_user.findOne({
                where : {
                    kode: kode
                }
            })
            console.log(user, data);
            if (user != null && user.email == data.email) {
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
        res.status(400).json({
            message: "No Auth"
        })
    }
}

module.exports = isAuth;