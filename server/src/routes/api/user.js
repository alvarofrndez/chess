const express = require('express');
const router = express.Router();
const user = require('../../controllers/api/user')

router.get('/', (req, res) => {
    
})

router.get('/getLocalKey', (req, res) => {
    user.getLocalKey(req, res)
})

router.post('/singIn', (req, res) => {
    user.singIn(req, res)
})

router.post('/login', (req, res) => {
    user.login(req, res)
})

router.post('/deleteTokenUser', (req, res) => {
    user.deleteTokenUser(req, res)
})

router.post('/getUserByToken', (req, res) => {
    user.getUserByToken(req, res)
})

router.get('/getPing', (req, res) => {
    return res.json({status: true})
})

module.exports = router