import pool from "../configs/connectDB";

let getHomepage = async (req, res) => {
    //logic
    const [rows, fields] = await pool.execute('SELECT * FROM `users`',);
    return res.render('index.ejs', { dataUser: rows });
}

let getDetailPage = async (req, res) => {
    let id = req.params.userID;
    let [user, fields] = await pool.execute(`SELECT * FROM users where id = ?`,[id]);
    console.log("check user: ", user)
    return res.render('detail.ejs', { userDetail: user[0] });
}

module.exports = {
    getHomepage, getDetailPage
}