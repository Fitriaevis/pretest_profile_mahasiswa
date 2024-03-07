var express = require('express');
var router = express.Router();
const Model_Mahasiswa = require('../model/Model_Mahasiswa');

// Menampilkan semua data mahasiswa
router.get('/', async function(req, res, next){
    try {
        let rows = await Model_Mahasiswa.getAll();
        res.render('mahasiswa/index',{
            data: rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan pada server');
    }
});

// Menampilkan form untuk membuat mahasiswa baru
router.get('/create', function(req, res, next) {
    res.render('mahasiswa/create');
});

// Menyimpan data mahasiswa baru ke database
router.post('/store', async function(req,res,next){
    try{
        let { nrp, nama_depan, nama_belakang, jenis_kelamin, agama, umur, tinggi_badan, gol_darah, alamat, hobi, email, no_telpon } = req.body;
        let data = {
            nrp,
            nama_depan,
            nama_belakang,
            jenis_kelamin,
            agama,
            umur,
            tinggi_badan,
            gol_darah,
            alamat,
            hobi,
            email,
            no_telpon
        };
        await Model_Mahasiswa.Store(data);
        req.flash('success', 'Berhasil Menyimpan Data!');
        res.redirect('/mahasiswa');
    } catch(err) {
        console.error(err);
        req.flash('error', 'Terjadi kesalahan pada penyimpanan data');
        res.redirect('/mahasiswa');
    }
});

// Menampilkan form untuk mengedit data mahasiswa berdasarkan ID
router.get('/edit/:id', async function(req,res, next){
    try {
        let id_mahasiswa = req.params.id;
        let rows = await Model_Mahasiswa.getId(id_mahasiswa);
        res.render('mahasiswa/edit', { 
            id_mahasiswa: rows[0].id_mahasiswa,
            nrp: rows[0].nrp,
            nama_depan: rows[0].nama_depan,
            nama_belakang: rows[0].nama_belakang,
            jenis_kelamin: rows[0].jenis_kelamin,
            agama: rows[0].agama,
            umur: rows[0].umur,
            tinggi_badan: rows[0].tinggi_badan,
            gol_darah: rows[0].gol_darah,
            alamat: rows[0].alamat,
            hobi: rows[0].hobi,
            email: rows[0].email,
            no_telpon: rows[0].no_telpon,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan pada server');
    }
});
// Menyimpan perubahan pada data mahasiswa ke database berdasarkan ID
router.post('/update/:id', async function(req,res, next){
    try {
        let id_mahasiswa = req.params.id;
        let { nrp, nama_depan, nama_belakang, jenis_kelamin, agama, umur, tinggi_badan, gol_darah, alamat, hobi, email, no_telpon } = req.body;
        let data = {
            nrp,
            nama_depan,
            nama_belakang,
            jenis_kelamin,
            agama,
            umur,
            tinggi_badan,
            gol_darah,
            alamat,
            hobi,
            email,
            no_telpon
        };
        await Model_Mahasiswa.Update(id_mahasiswa, data);
        req.flash('success', 'Berhasil memperbarui data!');
        res.redirect('/mahasiswa');
    } catch(err) {
        console.error(err);
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.redirect('/mahasiswa');
    }
});
// Menghapus data mahasiswa dari database berdasarkan ID
router.get('/delete/:id', async function(req, res, next){
    try {
        let id = req.params.id;
        await Model_Mahasiswa.Delete(id);
        req.flash('success', 'Berhasil menghapus data!');
        res.redirect('/mahasiswa');
    } catch(err) {
        console.error(err);
        req.flash('error', 'Terjadi kesalahan pada fungsi penghapusan data');
        res.redirect('/mahasiswa');
    }
});

module.exports = router;
