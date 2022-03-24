const {response} = require('express');
const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require('../models/Url');
const utils = require('nodemon/lib/utils');
const getUrls = async(req, res = response)=>{
    //fill de user info with populate
    const urls = await Url.find().populate('user','name' );
    res.json({
        ok :true,
        urls
    })
}

const createUrl = async(req, res = response)=>{
     const url = new Url(req.body);
     const {
        longUrl
    } = req.body;
    if (!validUrl.isUri(process.env.API_URL)) {
        return res.status(401).json('Invalid base URL');
    }
     // if valid, we create the url code
     const urlCode = shortid.generate();
    if (validUrl.isUri(longUrl))
    { try{
        let uri1= await Url.findOne({longUrl})
        if (uri1){
           return res.json({
                    ok:true,
                    url:uri1
            })
        } else{
        const shortUrl = process.env.API_URL + '/' + urlCode
        url.shortUrl = shortUrl;
        url.date = new Date();
        url.urlCode = urlCode;
        url.nVisits = 0;
       const savedUrl=  await url.save()
         
        res.json({
            ok:true,
            url: savedUrl
        })
    }
     }catch(error){
       console.log(error)
       res.status(500).json({
           ok:false,
           msg: 'Talk to the admin'
       })  
    }
     }
     else{
       return res.status(401).json({
            ok:false,
            msg: 'invalid long url'
        })  
     }
    
}

const updateUrl = async(req, res = response)=>{
    const urlId= req.params.id;
    const uid = req.uid;
    try{
        const url = await Url.findById(urlId);
        if(!url){
            return res.status(404).json({
                ok:false,
                msg:'The url does not exist'
            })
        }
        if(url.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'You dont have th e permissions to edit this url'
            });
        }
        const newUrl ={
            ...req.body,
            user:uid
        }
        const urlUpdated = await Url.findByIdAndUpdate(urlId,newUrl,{new:true} );
        res.json({
           ok:true,
          url:urlUpdated
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Talk to the admin"
        });
    }
   
}
const deleteUrl = async(req, res = response)=>{
    const urlId= req.params.id;
    const uid = req.uid;
    try{
        const url = await Url.findById(urlId);
        if(!url){
            return res.status(404).json({
                ok:false,
                msg:'The url does not exist'
            })
        }
        if(url.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'You dont have the permissions to delete this url'
            });
        }
       
        await Url.findByIdAndDelete(urlId);
        res.json({
           ok:true,
           url: "deleted"
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Talk to the admin"
        });
    }
}

module.exports= {
    getUrls,
    createUrl,
    updateUrl,
    deleteUrl
}