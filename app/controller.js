const app_jabatan = require('../configs/app_jabatan/controller');
const app_user = require('../configs/app_user/controller');
const data_barang = require('../configs/data_barang/controller');
const data_barang_golongan = require('../configs/data_barang_golongan/controller');
const data_daur_ulang = require('../configs/data_daur_ulang/controller');
const data_divisi = require('../configs/data_divisi/controller');
const data_divisi_ruang = require('../configs/data_divisi_ruang/controller');
const data_inventaris = require('../configs/data_inventaris/controller');
const data_peminjaman = require('../configs/data_peminjaman/controller');
const data_pengecekan = require('../configs/data_pengecekan/controller');
const data_penghapusan = require('../configs/data_penghapusan/controller');
const data_person = require('../configs/data_person/controller');
const data_person_type = require('../configs/data_person_type/controller');
const data_person_connect_type = require('../configs/data_person_connect_type/controller');
const data_riwayat_pelimpahan = require('../configs/data_riwayat_pelimpahan/controller');
const data_ruang = require('../configs/data_ruang/controller');
const controller = {};


controller.app_jabatan = app_jabatan;
controller.app_user = app_user;
controller.data_barang = data_barang;
controller.data_barang_golongan = data_barang_golongan;
controller.data_daur_ulang = data_daur_ulang;
controller.data_divisi = data_divisi;
controller.data_divisi_ruang = data_divisi_ruang;
controller.data_inventaris = data_inventaris;
controller.data_peminjaman = data_peminjaman;
controller.data_pengecekan = data_pengecekan;
controller.data_penghapusan = data_penghapusan;
controller.data_person = data_person;
controller.data_person_connect_type = data_person_connect_type;
controller.data_person_type = data_person_type;
controller.data_riwayat_pelimpahan = data_riwayat_pelimpahan;
controller.data_ruang = data_ruang;
module.exports= controller;