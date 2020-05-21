let express = require('express'),
    multer = require('multer'),
    jwt = require('jsonwebtoken'),
    verifyToken = require('../model/auth');
let router = express.Router();
let requestService = require('../model/request');
config = require('../DB');



router.post('/create-request', (req, res) => {
    var legit = verifyToken.verify(req.headers.authorization);
    if (legit) {
        requestService.createRequest(req.body,legit.user_id,  (err, data) => {
            if (err) {
                res.json({ message: "Unable to make request", success: false, status: 200 })
                console.log(err)
            }
            else {
                console.log('User ID = ',legit.user_id, data.insertId)
                config.getDB().query(`update requestblood set user_id = ${legit.user_id} where request_id = ${data.insertId}`);
                console.log(`update requestblood set user_id = ${legit.user_id} where request_id = ${data.insertId}`);
                res.json({ message: "We will get back to you when your request is met", success: true, status: 200 });
            }
        })
    }
    else {
        res.status(401).json({ message: 'Unauthorized Request' })
    }
});

router.get('/get-request-by-id/:request_id', (req, res) => {
    var legit = verifyToken.verify(req.headers.authorization)
    if (legit) {
        requestService.getRequestById(req.body, req.params, (err, data) => {
            if (err) {
                res.json({ message: 'Unable to get request try again after sometime', status: 200, success: false })
            }
            else {
                res.json({ message: 'Request Retrieved', status: 200, success: true, data })
            }
        })
    }
    else {
        res.status(401).json({ message: 'Unauthorized Request', status: 200, success: false })
    }
});

router.put('/update-request-by-id/:request_id', (req, res) => {
    var legit = verifyToken.verify(req.headers.authorization)
    if (legit) {
        requestService.updateRequest(req.body, req.params, (err, data) => {
            if (err) {
                res.json({ message: 'Unable to update request try again after sometime', status: 200, success: false })
            }
            else {
                res.json({ message: 'Request Updated', status: 200, success: true })
            }
        })
    }
    else {
        res.status(401).json({ message: 'Unauthorized Request', status: 200, success: false })
    }
})

module.exports = router;