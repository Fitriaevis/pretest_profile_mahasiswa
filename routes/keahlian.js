var express = require('express');
var router = express.Router();
const Model_Keahlian = require('../model/Model_Keahlian');

// Menampilkan semua data keahlian
router.get('/', async function(req, res, next){
    try {
        let rows = await Model_Keahlian.getAll();
        res.render('keahlian/index',{
            data: rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan pada server');
    }
});

// Menampilkan form untuk membuat keahlian baru
router.get('/create', function(req, res, next) {
    res.render('keahlian/create');
});

// Menyimpan data keahlian baru ke database
router.post('/store', async function(req,res,next){
    try{
        let { nama_keahlian, tingkat_keahlian, id_mahasiswa } = req.body;
        let data = {
            nama_keahlian,
            tingkat_keahlian,
            id_mahasiswa
        };
        await Model_Keahlian.Store(data);
        req.flash('success', 'Berhasil Menyimpan Data!');
        res.redirect('/keahlian');
    } catch(err) {
        console.error(err);
        req.flash('error', 'Terjadi kesalahan pada penyimpanan data');
        res.redirect('/keahlian');
    }
});

// Menampilkan form untuk mengedit data keahlian berdasarkan ID
router.get('/edit/:id', async function(req,res, next){
    try {
        let id_keahlian = req.params.id;
        let rows = await Model_Keahlian.getId(id_keahlian);
        res.render('keahlian/edit', { 
            id_keahlian: rows[0].id_keahlian,
            nama_keahlian: rows[0].nama_keahlian,
            tingkat_keahlian: rows[0].tingkat_keahlian,
            id_mahasiswa: rows[0].id_mahasiswa,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan pada server');
    }
});

// Menyimpan perubahan pada data keahlian ke database berdasarkan ID
router.post('/update/:id', async function(req,res, next){
    try {
        let id_keahlian = req.params.id;
        let { nama_keahlian, tingkat_keahlian, id_mahasiswa } = req.body;
        let data = {
            nama_keahlian,
            tingkat_keahlian,
            id_mahasiswa
        };
        await Model_Keahlian.Update(id_keahlian, data);
        req.flash('success', 'Berhasil memperbarui data!');
        res.redirect('/keahlian');
    } catch(err) {
        console.error(err);
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.redirect('/keahlian');
    }
});

// Menghapus data keahlian dari database berdasarkan ID
router.get('/delete/:id', async function(req, res, next){
    try {
        let id = req.params.id;
        await Model_Keahlian.Delete(id);
        req.flash('success', 'Berhasil menghapus data!');
        res.redirect('/keahlian');
    } catch(err) {
        console.error(err);
        req.flash('error', 'Terjadi kesalahan pada fungsi penghapusan data');
        res.redirect('/keahlian');
    }
});

module.exports = router;
