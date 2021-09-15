-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 13, 2021 at 10:31 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventaris-yysan`
--

-- --------------------------------------------------------

--
-- Table structure for table `app_jabatan`
--

CREATE TABLE `app_jabatan` (
  `kode` varchar(10) NOT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `update` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `insert` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('0','1') DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `app_jabatan`
--

INSERT INTO `app_jabatan` (`kode`, `nama`, `update`, `insert`, `status`) VALUES
('01', 'IT', '2021-09-10 18:48:29', '2021-09-10 18:48:29', '0'),
('02', 'Sekertaris', '2021-09-12 00:02:50', '2021-09-10 18:48:47', '0');

-- --------------------------------------------------------

--
-- Table structure for table `app_user`
--

CREATE TABLE `app_user` (
  `kode` varchar(10) NOT NULL,
  `nip` varchar(30) DEFAULT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `jabatan` varchar(10) DEFAULT NULL,
  `no_hp` varchar(15) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(500) NOT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `update` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `insert` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('0','1') DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `app_user`
--

INSERT INTO `app_user` (`kode`, `nip`, `nama`, `jabatan`, `no_hp`, `email`, `password`, `alamat`, `role`, `update`, `insert`, `status`) VALUES
('02', '001', 'Rahmad Nasution', '01', '081225104603', 'rahmadnasution@gmail.com', 'rahmadnet', 'Yogya', 'admin', '2021-09-13 06:29:46', '2021-09-10 21:24:58', '0');

-- --------------------------------------------------------

--
-- Table structure for table `data_barang`
--

CREATE TABLE `data_barang` (
  `kode` varchar(10) NOT NULL,
  `golongan` varchar(10) DEFAULT NULL,
  `code` varchar(30) DEFAULT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `update` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `insert` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('0','1') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_barang`
--

INSERT INTO `data_barang` (`kode`, `golongan`, `code`, `nama`, `update`, `insert`, `status`) VALUES
('01', '01', '001', 'Meja', '2021-09-12 00:14:14', '2021-09-10 18:59:11', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `data_barang_golongan`
--

CREATE TABLE `data_barang_golongan` (
  `kode` varchar(10) NOT NULL,
  `code` varchar(30) DEFAULT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `update` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `insert` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('0','1') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_barang_golongan`
--

INSERT INTO `data_barang_golongan` (`kode`, `code`, `nama`, `update`, `insert`, `status`) VALUES
('01', 'G01', 'Peralatan', '2021-09-12 00:22:01', '2021-09-10 18:54:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `data_daur_ulang`
--

CREATE TABLE `data_daur_ulang` (
  `kode` varchar(10) NOT NULL,
  `inventaris_lama` varchar(10) DEFAULT NULL,
  `inventaris_baru` varchar(10) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `update` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `insert` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('0','1') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `data_divisi`
--

CREATE TABLE `data_divisi` (
  `kode` varchar(10) NOT NULL,
  `code` varchar(30) DEFAULT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `person_penanggung_jawab` varchar(10) DEFAULT NULL,
  `batas_pengecekan_awal` date DEFAULT NULL,
  `batas_pengecekan_akhir` date DEFAULT NULL,
  `update` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `insert` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('0','1') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_divisi`
--

INSERT INTO `data_divisi` (`kode`, `code`, `nama`, `person_penanggung_jawab`, `batas_pengecekan_awal`, `batas_pengecekan_akhir`, `update`, `insert`, `status`) VALUES
('01', '01', 'Unin Usaha', '01', '2021-09-10', '2021-09-19', '2021-09-10 20:13:07', '2021-09-10 20:13:07', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `data_divisi_ruang`
--

CREATE TABLE `data_divisi_ruang` (
  `kode` varchar(10) NOT NULL DEFAULT '0',
  `divisi` varchar(10) DEFAULT NULL,
  `ruang` varchar(10) DEFAULT NULL,
  `person_penanggung_jawab` varchar(10) DEFAULT NULL,
  `update` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `insert` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('0','1') NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `data_inventaris`
--

CREATE TABLE `data_inventaris` (
  `kode` varchar(10) NOT NULL,
  `code` varchar(30) DEFAULT NULL,
  `barang` varchar(10) DEFAULT NULL,
  `harga` double DEFAULT NULL,
  `person_donatur` varchar(10) DEFAULT NULL,
  `divisi` varchar(10) DEFAULT NULL,
  `ruang` varchar(10) DEFAULT NULL,
  `kepemilikan` varchar(10) DEFAULT NULL,
  `kondisi` varchar(30) DEFAULT NULL,
  `status_lokasi` varchar(10) DEFAULT NULL,
  `dokumen` varchar(10) DEFAULT NULL,
  `person_pencatat` varchar(10) DEFAULT NULL,
  `tanggal_masuk` date DEFAULT NULL,
  `update` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `insert` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('0','1') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_inventaris`
--

INSERT INTO `data_inventaris` (`kode`, `code`, `barang`, `harga`, `person_donatur`, `divisi`, `ruang`, `kepemilikan`, `kondisi`, `status_lokasi`, `dokumen`, `person_pencatat`, `tanggal_masuk`, `update`, `insert`, `status`) VALUES
('01', '001', '01', 100000, '01', '01', '01', '01', 'Bagus', 'Unit Usaha', 'Surat', '01', '2021-09-11', '2021-09-12 01:11:50', '2021-09-12 01:11:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `data_peminjaman`
--

CREATE TABLE `data_peminjaman` (
  `kode` varchar(10) NOT NULL,
  `code` varchar(30) DEFAULT NULL,
  `tanggal_pinjam` date DEFAULT NULL,
  `tanggal_kembali` date DEFAULT NULL,
  `barang` varchar(10) DEFAULT NULL,
  `kondisi_pinjam` varchar(30) DEFAULT NULL,
  `kondisi_kembali` varchar(30) DEFAULT NULL,
  `dokumen` varchar(50) DEFAULT NULL,
  `person_peminjam` varchar(10) DEFAULT NULL,
  `update` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `insert` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('0','1') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `data_pengecekan`
--

CREATE TABLE `data_pengecekan` (
  `kode` varchar(10) NOT NULL,
  `inventaris` varchar(10) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `kondisi` varchar(30) DEFAULT NULL,
  `person_pengecek` varchar(10) DEFAULT NULL,
  `update` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `insert` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('0','1') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `data_penghapusan`
--

CREATE TABLE `data_penghapusan` (
  `kode` varchar(10) NOT NULL,
  `code` varchar(30) DEFAULT NULL,
  `inventaris` varchar(10) DEFAULT NULL,
  `alasan` varchar(255) DEFAULT NULL,
  `status_penghapusan` varchar(10) DEFAULT NULL,
  `update` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `insert` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('0','1') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `data_person`
--

CREATE TABLE `data_person` (
  `kode` varchar(10) NOT NULL,
  `nama` varchar(30) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `no_telp` varchar(15) DEFAULT NULL,
  `update` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `insert` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('0','1') DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_person`
--

INSERT INTO `data_person` (`kode`, `nama`, `alamat`, `no_telp`, `update`, `insert`, `status`) VALUES
('01', 'rahmad', 'binbaz', '081225104603', '2021-09-10 09:29:28', '2021-09-10 09:29:28', '0');

-- --------------------------------------------------------

--
-- Table structure for table `data_person_connect_type`
--

CREATE TABLE `data_person_connect_type` (
  `kode` varchar(10) NOT NULL,
  `person` varchar(10) DEFAULT NULL,
  `person_type` varchar(10) DEFAULT NULL,
  `update` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `insert` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('0','1') DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_person_connect_type`
--

INSERT INTO `data_person_connect_type` (`kode`, `person`, `person_type`, `update`, `insert`, `status`) VALUES
('01', '01', '01', '2021-09-10 19:03:45', '2021-09-10 19:03:45', '0');

-- --------------------------------------------------------

--
-- Table structure for table `data_person_type`
--

CREATE TABLE `data_person_type` (
  `kode` varchar(10) NOT NULL,
  `nama` varchar(30) DEFAULT NULL,
  `update` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `insert` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('0','1') DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_person_type`
--

INSERT INTO `data_person_type` (`kode`, `nama`, `update`, `insert`, `status`) VALUES
('01', 'IT', '2021-09-10 18:44:40', '2021-09-10 18:44:40', '0'),
('02', 'Sarpras', '2021-09-10 18:44:58', '2021-09-10 18:44:58', '0');

-- --------------------------------------------------------

--
-- Table structure for table `data_riwayat_pelimpahan`
--

CREATE TABLE `data_riwayat_pelimpahan` (
  `kode` varchar(10) NOT NULL,
  `inventaris` varchar(10) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `divisi` varchar(10) DEFAULT NULL,
  `ruang` varchar(10) DEFAULT NULL,
  `update` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `insert` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('0','1') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `data_ruang`
--

CREATE TABLE `data_ruang` (
  `kode` varchar(10) NOT NULL,
  `code` varchar(30) DEFAULT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `person` varchar(10) DEFAULT NULL,
  `update` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `insert` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('0','1') DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_ruang`
--

INSERT INTO `data_ruang` (`kode`, `code`, `nama`, `person`, `update`, `insert`, `status`) VALUES
('01', '001', 'Ruang Rapat', '01', '2021-09-10 19:08:07', '2021-09-10 19:08:07', '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app_jabatan`
--
ALTER TABLE `app_jabatan`
  ADD PRIMARY KEY (`kode`),
  ADD UNIQUE KEY `kode` (`kode`);

--
-- Indexes for table `app_user`
--
ALTER TABLE `app_user`
  ADD PRIMARY KEY (`kode`),
  ADD UNIQUE KEY `kode` (`kode`),
  ADD KEY `jabatan` (`jabatan`);

--
-- Indexes for table `data_barang`
--
ALTER TABLE `data_barang`
  ADD PRIMARY KEY (`kode`),
  ADD UNIQUE KEY `kode` (`kode`),
  ADD KEY `golongan` (`golongan`);

--
-- Indexes for table `data_barang_golongan`
--
ALTER TABLE `data_barang_golongan`
  ADD PRIMARY KEY (`kode`),
  ADD UNIQUE KEY `kode` (`kode`);

--
-- Indexes for table `data_daur_ulang`
--
ALTER TABLE `data_daur_ulang`
  ADD PRIMARY KEY (`kode`),
  ADD UNIQUE KEY `kode` (`kode`),
  ADD KEY `inventaris_baru` (`inventaris_baru`),
  ADD KEY `inventaris_lama` (`inventaris_lama`);

--
-- Indexes for table `data_divisi`
--
ALTER TABLE `data_divisi`
  ADD PRIMARY KEY (`kode`),
  ADD UNIQUE KEY `kode` (`kode`),
  ADD KEY `person_penanggung_jawab` (`person_penanggung_jawab`);

--
-- Indexes for table `data_divisi_ruang`
--
ALTER TABLE `data_divisi_ruang`
  ADD PRIMARY KEY (`kode`),
  ADD UNIQUE KEY `kode` (`kode`);

--
-- Indexes for table `data_inventaris`
--
ALTER TABLE `data_inventaris`
  ADD PRIMARY KEY (`kode`),
  ADD UNIQUE KEY `kode` (`kode`),
  ADD KEY `barang` (`barang`),
  ADD KEY `divisi` (`divisi`),
  ADD KEY `person_donatur` (`person_donatur`),
  ADD KEY `person_pencatat` (`person_pencatat`),
  ADD KEY `ruang` (`ruang`);

--
-- Indexes for table `data_peminjaman`
--
ALTER TABLE `data_peminjaman`
  ADD PRIMARY KEY (`kode`),
  ADD UNIQUE KEY `kode` (`kode`),
  ADD KEY `barang` (`barang`);

--
-- Indexes for table `data_pengecekan`
--
ALTER TABLE `data_pengecekan`
  ADD PRIMARY KEY (`kode`),
  ADD UNIQUE KEY `kode` (`kode`),
  ADD KEY `inventaris` (`inventaris`),
  ADD KEY `person_pengecek` (`person_pengecek`);

--
-- Indexes for table `data_penghapusan`
--
ALTER TABLE `data_penghapusan`
  ADD PRIMARY KEY (`kode`),
  ADD UNIQUE KEY `kode` (`kode`),
  ADD KEY `inventaris` (`inventaris`);

--
-- Indexes for table `data_person`
--
ALTER TABLE `data_person`
  ADD PRIMARY KEY (`kode`),
  ADD UNIQUE KEY `kode` (`kode`);

--
-- Indexes for table `data_person_connect_type`
--
ALTER TABLE `data_person_connect_type`
  ADD PRIMARY KEY (`kode`),
  ADD UNIQUE KEY `kode` (`kode`),
  ADD KEY `person` (`person`),
  ADD KEY `person_type` (`person_type`);

--
-- Indexes for table `data_person_type`
--
ALTER TABLE `data_person_type`
  ADD PRIMARY KEY (`kode`),
  ADD UNIQUE KEY `kode` (`kode`);

--
-- Indexes for table `data_riwayat_pelimpahan`
--
ALTER TABLE `data_riwayat_pelimpahan`
  ADD PRIMARY KEY (`kode`),
  ADD UNIQUE KEY `kode` (`kode`),
  ADD KEY `divisi` (`divisi`),
  ADD KEY `inventaris` (`inventaris`),
  ADD KEY `ruang` (`ruang`);

--
-- Indexes for table `data_ruang`
--
ALTER TABLE `data_ruang`
  ADD PRIMARY KEY (`kode`),
  ADD UNIQUE KEY `kode` (`kode`),
  ADD KEY `person` (`person`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `app_user`
--
ALTER TABLE `app_user`
  ADD CONSTRAINT `app_user_ibfk_2` FOREIGN KEY (`jabatan`) REFERENCES `app_jabatan` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `data_barang`
--
ALTER TABLE `data_barang`
  ADD CONSTRAINT `data_barang_ibfk_1` FOREIGN KEY (`golongan`) REFERENCES `data_barang_golongan` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `data_daur_ulang`
--
ALTER TABLE `data_daur_ulang`
  ADD CONSTRAINT `data_daur_ulang_ibfk_1` FOREIGN KEY (`inventaris_baru`) REFERENCES `data_inventaris` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `data_daur_ulang_ibfk_2` FOREIGN KEY (`inventaris_lama`) REFERENCES `data_inventaris` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `data_divisi`
--
ALTER TABLE `data_divisi`
  ADD CONSTRAINT `data_divisi_ibfk_1` FOREIGN KEY (`person_penanggung_jawab`) REFERENCES `data_person` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `data_inventaris`
--
ALTER TABLE `data_inventaris`
  ADD CONSTRAINT `data_inventaris_ibfk_1` FOREIGN KEY (`barang`) REFERENCES `data_barang` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `data_inventaris_ibfk_2` FOREIGN KEY (`divisi`) REFERENCES `data_divisi` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `data_inventaris_ibfk_3` FOREIGN KEY (`person_donatur`) REFERENCES `data_person` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `data_inventaris_ibfk_4` FOREIGN KEY (`person_pencatat`) REFERENCES `data_person` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `data_inventaris_ibfk_5` FOREIGN KEY (`ruang`) REFERENCES `data_ruang` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `data_peminjaman`
--
ALTER TABLE `data_peminjaman`
  ADD CONSTRAINT `data_peminjaman_ibfk_1` FOREIGN KEY (`barang`) REFERENCES `data_barang` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `data_pengecekan`
--
ALTER TABLE `data_pengecekan`
  ADD CONSTRAINT `data_pengecekan_ibfk_1` FOREIGN KEY (`inventaris`) REFERENCES `data_inventaris` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `data_pengecekan_ibfk_2` FOREIGN KEY (`person_pengecek`) REFERENCES `data_person` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `data_penghapusan`
--
ALTER TABLE `data_penghapusan`
  ADD CONSTRAINT `data_penghapusan_ibfk_1` FOREIGN KEY (`inventaris`) REFERENCES `data_inventaris` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `data_person_connect_type`
--
ALTER TABLE `data_person_connect_type`
  ADD CONSTRAINT `data_person_connect_type_ibfk_1` FOREIGN KEY (`person`) REFERENCES `data_person` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `data_person_connect_type_ibfk_2` FOREIGN KEY (`person_type`) REFERENCES `data_person_type` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `data_riwayat_pelimpahan`
--
ALTER TABLE `data_riwayat_pelimpahan`
  ADD CONSTRAINT `data_riwayat_pelimpahan_ibfk_1` FOREIGN KEY (`divisi`) REFERENCES `data_divisi` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `data_riwayat_pelimpahan_ibfk_2` FOREIGN KEY (`inventaris`) REFERENCES `data_inventaris` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `data_riwayat_pelimpahan_ibfk_3` FOREIGN KEY (`ruang`) REFERENCES `data_ruang` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `data_ruang`
--
ALTER TABLE `data_ruang`
  ADD CONSTRAINT `data_ruang_ibfk_1` FOREIGN KEY (`person`) REFERENCES `data_person` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
