import express from "express"
import configViewEngine from "./configs/configWiewEngine"
require('dotenv').config()
import initWebRoute from './routes/web'
const app = express()
const port = process.env.PORT || 8081

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
initWebRoute(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})