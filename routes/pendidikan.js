var express = require('express');
var router = express.Router();
const Model_Pendidikan = require('../model/Model_Pendidikan');

// Menampilkan semua data mahasiswa
router.get('/', async function(req, res, next){
    try {
        let rows = await Model_Pendidikan.getAll();
        res.render('pendidikan/index',{
            data: rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan pada server');
    }
});

// Menampilkan form untuk membuat pendidikan baru
router.get('/create', function(req, res, next) {
    res.render('pendidikan/create');
});

// Menyimpan data pendidikan baru ke database
router.post('/store', async function(req,res,next){
    try{
        let { nama_instansi, jurusan, tahun_masuk, tahun_lulus, nomor_ijazah, id_mahasiswa } = req.body;
        let data = {
            nama_instansi,
            jurusan,
            tahun_masuk,
            tahun_lulus,
            nomor_ijazah,
            id_mahasiswa
        };
        await Model_Pendidikan.Store(data);
        req.flash('success', 'Berhasil Menyimpan Data Pendidikan!');
        res.redirect('/pendidikan');
    } catch(err) {
        console.error(err);
        req.flash('error', 'Terjadi kesalahan pada penyimpanan data pendidikan');
        res.redirect('/pendidikan');
    }
});

// Menampilkan form untuk mengedit data pendidikan berdasarkan ID
router.get('/edit/:id', async function(req, res, next){
    try {
        let id_pendidikan = req.params.id;
        let rows = await Model_Pendidikan.getId(id_pendidikan); // Anda perlu membuat Model_Pendidikan
        res.render('pendidikan/edit', { 
            data: rows, // Pass the data retrieved from the database to the template
            id_pendidikan: rows[0].id_pendidikan,
            nama_instansi: rows[0].nama_instansi,
            jurusan: rows[0].jurusan,
            tahun_masuk: rows[0].tahun_masuk,
            tahun_lulus: rows[0].tahun_lulus,
            nomor_ijazah: rows[0].nomor_ijazah,
            id_mahasiswa: rows[0].id_mahasiswa,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan pada server');
    }
});

// Menyimpan perubahan pada data pendidikan ke database berdasarkan ID
router.post('/update/:id', async function(req,res, next){
    try {
        let id_pendidikan = req.params.id;
        let { nama_instansi, jurusan, tahun_masuk, tahun_lulus, nomor_ijazah, id_mahasiswa } = req.body;
        let data = {
            nama_instansi,
            jurusan,
            tahun_masuk,
            tahun_lulus,
            nomor_ijazah,
            id_mahasiswa
        };
        await Model_Pendidikan.Update(id_pendidikan, data); // Anda perlu membuat Model_Pendidikan
        req.flash('success', 'Berhasil memperbarui data pendidikan!');
        res.redirect('/pendidikan');
    } catch(err) {
        console.error(err);
        req.flash('error', 'Terjadi kesalahan pada fungsi pembaruan pendidikan');
        res.redirect('/pendidikan');
    }
});

// Menghapus data pendidikan dari database berdasarkan ID
router.get('/delete/:id', async function(req, res, next){
    try {
        let id = req.params.id;
        await Model_Pendidikan.Delete(id); // Anda perlu membuat Model_Pendidikan
        req.flash('success', 'Berhasil menghapus data pendidikan!');
        res.redirect('/pendidikan');
    } catch(err) {
        console.error(err);
        req.flash('error', 'Terjadi kesalahan pada fungsi penghapusan data pendidikan');
        res.redirect('/pendidikan');
    }
});

module.exports = router;
