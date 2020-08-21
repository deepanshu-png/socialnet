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
var messageSchema = Schema({
   _id: Number,
   message:[{id:Number,who:Boolean,content:[String]}]
});
var Message = mongoose.model("message", messageSchema);
   console.log("created mongo message");
module.exports=Message;
