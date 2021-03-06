const express = require('express');
const {connect} = require('./db/mysql');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const multer = require('multer');
const upload = multer();
const cors = require('cors');
const jabatanRouter = require('./configs/app_jabatan/router');
const userRouter = require('./configs/app_user/router');
const barangRouter = require('./configs/data_barang/router');
const baranggolonganRouter = require('./configs/data_barang_golongan/router');
const daurulangRouter = require('./configs/data_daur_ulang/router');
const divisiRouter = require('./configs/data_divisi/router');
const inventarisRouter = require('./configs/data_inventaris/router');
const peminjamanRouter = require('./configs/data_peminjaman/router');
const pengecekanRouter = require('./configs/data_pengecekan/router');
const penghapusanRouter = require('./configs/data_penghapusan/router');
const divisiruangRouter = require('./configs/data_divisi_ruang/router');
const personRouter = require('./configs/data_person/router');
const persontypeRouter = require('./configs/data_person_type/router');
const personconnectRouter = require('./configs/data_person_connect_type/router');
const riwyatpelimpahanRouter = require('./configs/data_riwayat_pelimpahan/router');
const ruangRouter = require('./configs/data_ruang/router');


const app = express();
const router = express.Router();

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.any());

app.use(
    session({
      cookie: {
        maxAge: 6000,
          },
          secret: 'secret',
          resave: false,
          saveUninitialized: false,
      })
    );
    app.use(cors());


// Api
app.use('/jabatan', jabatanRouter);
app.use('/user', userRouter);
app.use('/barang', barangRouter);
app.use('/barang-golongan', baranggolonganRouter);
app.use('/daur-ulang', daurulangRouter);
app.use('/divisi', divisiRouter);
app.use('/inventaris', inventarisRouter);
app.use('/peminjaman', peminjamanRouter);
app.use('/pengecekan', pengecekanRouter);
app.use('/penghapusan', penghapusanRouter);
app.use('/person', personRouter);
app.use('/person-type', persontypeRouter);
app.use('/person-connect', personconnectRouter);
app.use('/riwayat-pelimpahan', riwyatpelimpahanRouter);
app.use('/ruang', ruangRouter);
app.use('/divisi-ruang', divisiruangRouter);



app.use("/", router)
app.use((error, req,res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports=app;