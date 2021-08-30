const express = require('express');
const userRouter = express.Router();
const Users = require('../models/user')

//   agar URL me / k baad : deke kuch declare karte hai toh voh variable maan leta hai
// usko parameters bolte hai.  access karne k liye req.params use karte hai
userRouter.get('/:name',(req,res)=>{
    console.log(req.params.name)
    // .find({}) me condition doge toh filter karke output dega
    Users.find({'name': req.params.name}, (err,data)=>{
        if(err){

            res.status(400).send(err)
        }else{
            
            res.status(200).send(data)

        }
    }) 
})

userRouter.post('/',async (req,res)=>{

    // jo user schema banaya tha uske andar value daalke ek object banate hai
    // fir is object ko save() karke DB me save kar lete hai;
    const newUser = new Users({
        name : req.body.name,
        phone : req.body.phone,
        email : req.body.email,
        passwd : req.body.password
    })

    const registeredUser = await newUser.save();
    // agar tumhe respone bhejna hai toh send me voh response bhej sakte ho
    // status me error code return karte hai, 200 matlab OK hota hai
    
    res.status(200).send('user registered',registeredUser);
})

module.exports = userRouter;