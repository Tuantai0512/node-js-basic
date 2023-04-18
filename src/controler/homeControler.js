import pool from "../configs/connectDB";
import multer from "multer"

let getHomepage = async (req, res) => {
    //logic
    const [rows, fields] = await pool.execute('SELECT * FROM `users`',);
    return res.render('index.ejs', { dataUser: rows });
}

let getDetailPage = async (req, res) => {
    let id = req.params.userID;
    let [user] = await pool.execute(`SELECT * FROM users where id = ?`,[id]);
    return res.render('detail.ejs', { userDetail: user[0] });
}

let createNewUser = async(req, res) => {
    let {firstName, lastName, email, address} = req.body;
    await pool.execute(`INSERT INTO users(firstName, lastName, email, address) VALUES (?, ?, ?, ?)`,[firstName, lastName, email, address])
    return res.redirect('/');
}

let deleteUser = async(req, res) => {
    let id = req.body.userID;
    await pool.execute(`DELETE FROM users WHERE id = ?;`,[id]);
    return res.redirect('/');
}

let editUser = async(req, res) => {
    let id = req.params.userID;
    let [user] = await pool.execute(`SELECT * FROM users where id = ?`,[id]);
    return res.render('update.ejs', { userUpdate: user[0] });
}

let updateUser = async(req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    await pool.execute('update users set firstName= ?, lastName = ? , email = ? , address= ? where id = ?',
        [firstName, lastName, email, address, id]);
    return res.redirect('/');
}

let getUploadFile = (req, res) => {
    return res.render('uploadFile.ejs');
}

let handleUploadFile = async (req, res) => {
    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    });
}

module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, editUser, updateUser, getUploadFile, handleUploadFile
}