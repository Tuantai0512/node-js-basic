import express from "express"
import configViewEngine from "./configs/configWiewEngine"
require('dotenv').config()
const app = express()
const port = process.env.PORT || 8081

configViewEngine(app)

app.get('/', (req, res) => {
   res.render('test/index.ejs')
})

app.get('/about', (req, res) => {
    res.send(`I'm Hậu tạ vcl`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})