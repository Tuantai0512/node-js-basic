import express from "express";
import APIControler from "../controler/APIControler"
let router = express.Router();

const initAPI = (app) => {
    router.get('/users', APIControler.getAllUsers); // GET method
    router.post('/create-user',APIControler.createNewUser) // POST method
    router.put('/update-user',APIControler.updateUser) // PUT method
    router.delete('/delete-user/:id',APIControler.deleteUser) // DELETE method
    return app.use('/api/v1', router)
}

export default initAPI;