var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true });
//Get the default connection
var db = mongoose.connection;
console.log("connected db")
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Schema = mongoose.Schema;
var Post = new Schema({
    _id        : Number
  , content   : String
  , date      : Date
  , likes     : Number
  , comments  : [{_id:Number,name:String,comment:String}]
});

var personSchema = Schema({
   _id: Number,
   name: String,
   friends:[Number],
   post:[Post],
   friendspost:[{_id:Number,post_id:[Number]}],
   online:Boolean,
   message:{who:Boolean,content:String},
   pass: String,
   notifications:[{addfriend:Number,name:String}],
   message:[String],
   pendingreq:[{_id:Number,Name:String}]
});
var Person = mongoose.model("person", personSchema);
   console.log("created mongo");
module.exports=Person;
