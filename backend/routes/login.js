const express=require('express')
const router=express.Router()


router.get('/',(req,res)=>{
    const { email, password } = req.body;
    
    // Simulate a simple authentication check
    //email and password must be equal to the one used in register
    if (email === 'test@example.com' && password === 'password123') {
        res.json({ success: true, message: 'Login successful!' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
})

module.exports=router

