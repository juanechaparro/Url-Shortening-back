const { Schema, model } = require("mongoose");

const URLSchema = Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    nVisits: Number,
    title: String,
    date: {
        type: String,
        default: Date.now
    },
   user:{
    type: Schema.Types.ObjectId,
    ref: 'User'
 }
});
URLSchema.method('toJSON', function(){
   const {__v, _id, ...object} =this.toObject();
   object.id = _id;
   return object;
})

 module.exports = model('Url', URLSchema);