const  connection = require('../config/database');

class Model_Pendidikan{
    //mengambil data
    static async getAll(){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM pendidikan ORDER BY id_pendidikan DESC', (err, rows) => {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
        });
    }
    //menyimpan data
    static async Store(Data){
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO pendidikan SET ?', Data, function(err, result){
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        });
    }
    //mengambil data berdasarkan ID
    static async getId(id){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM pendidikan WHERE id_pendidikan = ' + id, (err, rows) => {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        });
    }
    //mengupdate data
    static async Update(id, Data){
        return new Promise((resolve, reject) => {
            connection.query('UPDATE pendidikan SET ? WHERE id_pendidikan = ' + id, Data, function(err, result){
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        });
    }
    //menghapus data
    static async Delete(id){
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM pendidikan WHERE id_pendidikan = ' + id, function(err, result){
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        });
    }
}

module.exports = Model_Pendidikan;