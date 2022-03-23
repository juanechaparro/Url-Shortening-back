const {response} = require('express');
const Evento = require('../models/Evento');
const getEvents = async(req, res = response)=>{
    //fill de user info with populate
    const events = await Evento.find().populate('user','name' );
    res.json({
        ok :true,
        events
    })
}

const createEvent = async(req, res = response)=>{
     const event = new Evento(req.body);
     try{
        event.user= req.uid;
       const savedEvent=  await event.save()
        res.json({
            ok:true,
            event: savedEvent
        })
     }catch(error){
       console.log(error)
       res.status(500).json({
           ok:false,
           msg: 'Talk to the admin'
       })  
     }
    
}

const updateEvent = async(req, res = response)=>{
    const eventId= req.params.id;
    const uid = req.uid;
    try{
        const event = await Evento.findById(eventId);
        if(!event){
            return res.status(404).json({
                ok:false,
                msg:'The event does not exist'
            })
        }
        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'You dont have th e permissions to edit this event'
            });
        }
        const newEvent ={
            ...req.body,
            user:uid
        }
        const eventUpdated = await Evento.findByIdAndUpdate(eventId,newEvent,{new:true} );
        res.json({
           ok:true,
           event: eventUpdated
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Talk to the admin"
        });
    }
   
}
const deleteEvent = async(req, res = response)=>{
    const eventId= req.params.id;
    const uid = req.uid;
    try{
        const event = await Evento.findById(eventId);
        if(!event){
            return res.status(404).json({
                ok:false,
                msg:'The event does not exist'
            })
        }
        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'You dont have the permissions to delete this event'
            });
        }
       
        await Evento.findByIdAndDelete(eventId);
        res.json({
           ok:true,
           event: "deleted"
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
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}