const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try{
        mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTOpology:true
        });
        console.log('DB Online');
    }
    catch(error){
        console.log(error);
        throw new Error(' Error initialized db');
    }
}

module.exports = {
    dbConnection
}