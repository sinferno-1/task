const express= require('express')
const router= express.Router() ;

const obj =require('../controllers/events')


router.post('/create',obj.createEvent)
router.get('/get',obj.readEvent)
router.patch('/update/:eid',obj.updateEvent)
router.patch('/cancel/:eid',obj.cancelEvent)

module.exports= router ;