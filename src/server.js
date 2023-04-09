import express from "express"
import configViewEngine from "./configs/configWiewEngine"
const app = express()
const port = 8080

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