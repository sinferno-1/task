const express= require('express')
const router= express.Router() ;

const obj =require('../controllers/auth')


router.post('/login',obj.login)
router.post('/signup',obj.signup)
router.get('/getUser/:id',obj.getUser)

module.exports= router ;