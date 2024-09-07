const express=require('express')
const router=express.Router()
const {getorders,getorder}=require('../controller/orderroutescontroller')

//get all users
router.get('/',getorders)
//get a single order
router.get('/:id',(getorder))


module.exports = router;