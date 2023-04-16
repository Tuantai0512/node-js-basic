import pool from "../configs/connectDB";

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

module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, editUser, updateUser
}