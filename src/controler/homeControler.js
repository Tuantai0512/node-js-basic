import connection from "../configs/connectDB";

let getHomepage = (req, res) => {
    //logic
    let data = [];
    connection.query(
        'SELECT * FROM `users`',
        function (err, results, fields) {
            data = results;
            console.log(data); // results contains rows returned by server
            return res.render('index.ejs', { dataUser: data });
        }
    );
}

module.exports = {
    getHomepage
}