const bcrypt = require('bcryptjs');
const {response} = require('express');

const {validationResult} = require('express-validator');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/User');

const createUser= async(req, res = response)=>{
    const{email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if (user){
            return res.status(400).json({
                ok:false,
                msg: 'an user already registerd whith this emial'
            })
        }
        
        user = new User(req.body);
        // crypt password
        const salt = bcrypt.genSaltSync();
        user.password= bcrypt.hashSync(password, salt);
        await user.save();
        //jwt
        const token = await generateJWT(user.id, user.name);
        
       
        res.status(201).json({
           ok: true,
           uid: user.id,
           name: user.name,
           token
     });
    }catch(error){
        res.status(500).json({
            ok:false,
            msg:'Please talk to the admin'
        })
    }
   
}

const loginUser =  async (req, res = response)=>{
    
    const{ email, password}  = req.body;
    try{
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({
                ok:false,
                msg: 'user does not exist'
            })
        }
    // Confirm passwords
    const validPassword = bcrypt.compareSync(password, user.password);
     if ( !validPassword){
         return res.status(400).json({
             ok:false,
             msg:'invalid password'
         });
     }
     //jsw
     const token = await generateJWT(user.id, user.name);
     res.json({
        ok:true,
        uid: user.id,
        name: user.name,
        token
        
     })
    }
    catch (error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Please talk to the admin'
        })
    }

    
}
const revalidateToken =  async(req, res = response)=>{
     const {uid, name }= req;
     const token = await generateJWT(uid, name);
    res.json({
       ok: true,
       uid, name,
       token
      
 })
}
 module.exports = {
    createUser,
    loginUser,
    revalidateToken

 }