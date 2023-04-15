import express from "express";
import homeController from '../controler/homeControler'
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);
    router.get('/detail/users/:userID', homeController.getDetailPage);
    router.post('/create-new-user', homeController.createNewUser)
    router.get('/about', (req, res) => {
        res.send(`I'm Hậu tạ vcl`)
    })

    return app.use('/', router)
}

export default initWebRoute;