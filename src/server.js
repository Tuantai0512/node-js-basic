import express from "express"
import configViewEngine from "./configs/configWiewEngine"
require('dotenv').config()
import initWebRoute from './routes/web'
const app = express()
const port = process.env.PORT || 8081

configViewEngine(app);
initWebRoute(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})