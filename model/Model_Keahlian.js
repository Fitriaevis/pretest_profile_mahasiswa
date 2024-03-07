const  connection = require('../config/database');

class Model_Keahlian{
    //mengambil data
    static async getAll(){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM keahlian ORDER BY id_keahlian DESC', (err, rows) => {
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
            connection.query('INSERT INTO keahlian SET ?', Data, function(err, result){
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
            connection.query('SELECT * FROM keahlian WHERE id_keahlian = ' + id, (err, rows) => {
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
            connection.query('UPDATE keahlian SET ? WHERE id_keahlian = ' + id, Data, function(err, result){
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
            connection.query('DELETE FROM keahlian WHERE id_keahlian = ' + id, function(err, result){
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        });
    }
}

module.exports = Model_Keahlian;