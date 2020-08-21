var express = require('express');
require('dotenv').config();
const app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path=require('path');
const multer = require('multer');
var bodyParser = require('body-parser')
var fs=require('fs')
const ip = require('./src/component/ip.js');
var Person=require('./user.js')
var Message=require('./msgdb.js')
var room=[]
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/component/images/')
  },
  filename: function (req, file, cb) {
    cb(null , file.originalname);
  }

}
)

var upload = multer({storage:storage})

app.use(express.static(path.join(__dirname, 'build')));
//Import the mongoose module

app.get('/', function (req, res) {
  res.cookie('name', 'express').sendFile(path.join(__dirname, 'build', 'index.html'));

});
app.post('/verify',function(req,res){
  Person.find({name:req.body.name,pass:req.body.pass},(err,data)=>{if(err){console.log(err)} else if (data.length!=0)
  {console.log(data);
    res.send({id:data[0]._id,status:"verified"});
  }else {
    res.send({status:"not verified"})
  }
})
console.log(req.body);
})

//get user post
app.get('/:id/post',(req,res)=>{
  var user=parseInt(req.params.id)
  Person.findOne({_id:user},{post:1},{notification:1},(err,result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result.post)
    }
  })
})

//get friends post
app.get('/:id/getfriendspost',(req,res)=>{
  console.log("getfriendspost");
  var id=parseInt(req.params.id)
  Person.findOne({_id:id},{friendspost:1},(err,result)=>{
    if(result.friendspost==[]){
      res.send("null")
    }
    else{
      Person.aggregate([{$project:{floodpost:result.friendspost,post:1,name:1 }},{
        $project: {post:1 ,name:1,

          filterpost:{
            $filter: {
              input: "$floodpost",
              as: "posting",
              cond: { $eq: ["$_id","$$posting._id"] }
            }}
          } },{$unwind:"$filterpost"},
          {$project:{name:1,
            finalpost:{$filter:{input:"$post",
            as:"p",
            cond:{$in:["$$p._id","$filterpost.post_id"]}}}}}],(err,result)=>{
              if (err) {
                console.log(err);
              } else {
                console.log("here",result);
                var len=result.length;
                var i=0;
                var result1=[]
                while(i<len){
                  if (result[i].finalpost) {
                    let buff = fs.readFileSync(path.join(__dirname, 'src/component/images/', result[i]._id+'.jpeg'),(err, data) => {
                      if (err) throw err;
                      console.log(data);
                    });
                    let base64data = buff.toString('base64');

                    result1.push({_id:result[i]._id,finalpost:result[i].finalpost,image:base64data,name:result[i].name})
                  }i++}
                  console.log("result",result);
                  res.send(result1);
                }

              } )}})}
            )

//images upload
app.post('/upload',upload.single('myFile'),function(req,res){if(req.file)console.log("file received")
else console.log("no file received") })
//
app.post('/like',(req,res)=>{
  console.log(req.body);
  Person.updateOne(
    { _id: req.body.whos},
    { $inc:{"post.$[element].likes":req.body.liked}},{ arrayFilters: [ { "element._id": req.body.userpost } ]},(err,result)=>{if(err){console.log(err)}else {
      console.log("result is",result);
    }}
  )
})
app.post('/notification',(req,res)=>{console.log("notification");
Person.findOne({_id:req.body.user},{notifications:1,_id:0,name:1},(err,result)=>{
  console.log({result});
  res.send(result.notifications)
})
})
app.post('/addfriend',(req,res)=>{
  var senderid=parseInt(req.body.senderid)
  Person.updateOne({_id:req.body.addid},{$push:{notifications:{name:req.body.name,addfriend:senderid}}},(err,result)=>{
    if (err) {
      console.log("err",err);
    } else {
      console.log("res",result);
    }
  })
})
app.post('/conformfriend',(req,res)=>{
  var addid=parseInt(req.body.addid)
  var senderid=parseInt(req.body.senderid)
  console.log("ids",addid,senderid,req.body.senderid);
  Person.update({_id:senderid},{$push:{friends:addid,friendspost:{_id:addid}}},(err,result)=>{
    if (err) {
      console.log(err);
    } else {
      console.log(result)
    }
  })
  Person.update({_id:addid},{$push:{friends:senderid,friendspost:{_id:senderid}},$pull:{notifications:{addfriend:senderid}}},(err,result)=>{
    if (err) {
      console.log(err);
    } else {
      console.log(result)
    }
  })
  console.log(addid,senderid);
  res.send("success")
})
app.post('/postcomment',(req,res)=>{
  var user1=req.body.user
  var user2=req.body.userpost
  var name=req.body.name
  var comment=req.body.comment
  var post =req.body.post
  console.log(typeof(req.body.user),req.body.userpost);

  Person.updateOne(
    { _id: user2},
    { $push:{"post.$[element].comments":{_id:user1,name:name,comment:comment}} }, { arrayFilters: [ { "element._id": post } ], upsert: true },(err,result)=>{if(err){console.log(err)}else {
      console.log(result);
    }}
  )
})

//name change
app.post('/name',(req,res)=>{
  console.log("here");
  Person.updateOne({_id:req.body.id},{$set:{name:req.body.name}},(err,result)=>{
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  })
})
app.post('/share',(req,res)=>{

})
  app.post('/comments',(req,res)=>{
              console.log(req.body);
              Person.aggregate([{$match:{"_id":req.body.user}},{$project:{_id:0,comment:{$filter:
                {input:"$post",as:"searchpost",cond:{$eq:[req.body.post,"$$searchpost._id"]}}}}},{$project:{"comment.comments":1}}],(err,result)=>{
                  if (err) {
                    console.log(err);
                  } else {
                    if (result.length!=0) {
                      console.log(result[0].comment[0].comments[0]);
                      var len=result[0].comment[0].comments.length;
                      var a=[]
                      var i=0
                      while(i<len){
                        var result1=result[0].comment[0].comments[i]._id
                        let buff = fs.readFileSync(path.join(__dirname, 'src/component/images/', result1+'.jpeg'));
                        let base64data = buff.toString('base64');
                        a.push({name:result[0].comment[0].comments[len-1].name,image:base64data,comment:result[0].comment[0].comments[len-1].comment})
                        i++;
                      }
                      res.send(a)
                    }else {
                      res.send(null)
                    }      }
                  })    })

      app.post('/signup',function(req,res){
        console.log("hello");
        if(req.body.name.length>=1){
          Person.aggregate([{$sort:{_id:-1}},{$limit:1},{$project:{_id:1}}],function(err, result) {
            var id=result[0]._id+1
            console.log("result is",result);
            fs.readFileSync(path.join(__dirname, 'src/component/images/', 'new.jpeg'))
            fs.copyFile(path.join(__dirname, 'src/component/images/','new.jpeg'),path.join(__dirname, 'src/component/images/',id+'.jpeg'), (err) => {
              if (err) {
                console.log("Error Found:", err);
              }


            })
            var newPerson=new Person({name:req.body.name,_id:id,pass:req.body.pass,friends:[],post:[{content:`Welcome User ${req.body.name}`,date:new Date(),likes:0,comments:[]}],online:true,pendingreq:[],notifications:[],friendspost:[]})
            newPerson.save(function(err, Person){
              if(err)
              console.log('show_message', {message: "Database error",err});
              else
              { console.log('show_message', {
                message: "New person added", type: "success", person: newPerson.name});
                res.send({id:id,status:"verified"})}
              });
            })
          }

        })

  //pending friends request
    app.post('/pending',(req,res)=>{
      console.log(req.body,"awdwdqwf");
      Person.findOne({_id:req.body.user},{notifications:1},(err,result)=>{

        if (result.notifications.length==0) {
          res.send(null)
        } else {
          var len=result.notifications.length
          var i=0
          var response=[]
          while(i<len){
            let buff = fs.readFileSync(path.join(__dirname, 'src/component/images/', result.notifications[i].addfriend+'.jpeg'));
            let base64data = buff.toString('base64');
            response.push({id:result.notifications[i].addfriend,image:base64data,name:result.notifications[i].name})
            i++
          }

          res.send(response)

        }
      })
    })

    //user create a new post. Friends are notified through userid and postid.
    app.post('/post',(req,res)=>{
      var id=parseInt(req.body.id)
      console.log("Content",req.body);


      //update in self
      Person.aggregate([{$match:{_id:id}},{$project:{max:{$max:"$post._id"},friends:1}}],(err,res)=>{console.log("got result",res);
      var id2=res[0].max+1
      var friends=res[0].friends
      Person.updateOne(
        { _id: id},
        { $push:{post: {$each:[{_id:id2,content:req.body.content,date:new Date(),likes:0,comments:[]}],$position:0} }},(err,result)=>{if(err){console.log(err)}else {
          console.log(result);
        }}
      )
      Person.updateMany({_id:{$in:friends}},{$push:{"friendspost.$[element].post_id":{$each:[id2],$position:0}}},{arrayFilters:[{"element._id":id}],upsert:true},(err,res)=>{

        if(err){
          console.log("error update friendspost",err);
        }
        else {
          console.log("success FriendsPost",id2,res);
        }
      })

    })
    //send notification to friends
    //Person.findAndUpdate({_id:{$in:}})
  })
var user=[]
var soc=[]
var uid=[]
io.on('connection', function(socket) {

  socket.on('search',(data)=>{console.log("hello search---",data);

  var A=new RegExp(`${data}`)
  Person.find({name:{$regex:A}},{name:1},(err,result)=>{
    var i=0;
    var len=result.length
    console.log("data",result);
    var a=[]
    while(i<len)
    {
      var res=result[i]._id
      let buff = fs.readFileSync(path.join(__dirname, 'src/component/images/', res+'.jpeg'));
      let base64data = buff.toString('base64');
      a.push({name:result[i].name,image:base64data,id:result[i]._id})
      i++;
    }
    socket.on('hello',()=>{
      console.log("hello")}
    )
    socket.emit('searchres',a)
  })
})
socket.on('disconnect', function () {
  console.log('A user disconnected');
  console.log("disocnnssse",soc,"user",user,"sockket",socket.id)
});
});
var nsp = io.of('/chat');

//Whenever someone connects this gets executed-----------____------___---___--___---________---___---__---___---__---__---___---__---_____-
nsp.on('connection', function(socket) {
  console.log('A user connected '+socket.id);

  //  socket.on('create', function (room) {
  //  console.log("room: "+room+" created")
  //  socket.join(room);
  //});
  socket.on('join',data=>{console.log("join",data);
  socket.join(data)
})
socket.on('chat',(data)=>{
  socket.join(data.id)

  console.log("sendin",data.id);
  socket.to(data.id).emit('join',{room:data.id2,name:data.name})
})
socket.on('typing',(data)=>{
  console.log("typing",data);
  socket.to(data.id).emit('typing',{id:data.id2,data:data.typing,id2:data.id})
})
socket.on('sendmessage',(data)=>{
  console.log("sendmessage",data);
  //0-friend,1-user
  socket.to(data.id).emit('message',{id:data.id2,data:data.data,id2:data.id});
})

socket.on('status',(data)=>{
  var id=parseInt(data);
  user={...user,[id]:socket.id};
  var sock=socket.id;
  soc={...soc,[sock]:id};uid.push(id)
  uid.push(data)
  Person.findOneAndUpdate(
    {"_id": id},
    { $set: { "online":true}},(err,result)=>{if(err){console.log(err)} ;}
  )
})
//Whenever someone disconnects this piece of code executed
socket.emit('sent','sent from server')
socket.on('disconnect', function () {

  var index=soc[socket.id];
  var id=user[index]
  console.log("disocnne",index,"user",id,"sockket",socket.id)
  user[index]=null;
  uid[index]=null;
  Person.updateOne(
    {"_id": index},
    { $set: { online:false}},(err,result)=>{if(err){console.log(err)}else{console.log(result)}}
  )
  socket.to(index+'1').emit('status',{id:index,online:false})

});

socket.on('disconnected',()=>{
  console.log("disocnne",soc,"user",user,"sockket",socket.id)
  var index=soc[socket.id];
  var id=user[index]
  user[index]=null;
  uid[index]=null;
  Person.findOneAndUpdate(
    {"_id": index},
    { $set: { "online":false}},(err,result)=>{if(err){console.log(err)}}
  )
  socket.to(index+'1').emit('status',{id:index,online:false})
})
socket.on('/friends',(data)=>{
  socket.join(data);
  socket.join(data+'1');
  console.log("joined own id",data);

  Person.find({friends:{$all:[data]}},(err,result)=>{if(err) console.log(err);
    var i=0;
    var len=result.length
    var a=[]
    if (len==0) {
      socket.emit('friends',a)
    } else {
      while(i<len)
      {
        var res=result[i]._id
        let buff = fs.readFileSync(path.join(__dirname, 'src/component/images/', res+'.jpeg'));
        let base64data = buff.toString('base64');
        a.push({name:result[i].name,image:base64data,status:{id:res,online:uid.includes(result[i]._id)}})
        i++;

        socket.join(res+'1');
        socket.join(res);
        socket.to(res).emit('status',{id:data,online:true})
        console.log("emitted");
        socket.leave(res)

      }

      socket.emit('friends',a)
    }
  })

})
socket.on('receive',function(data){socket.emit('sent','sent data')})
});

//---------____--------_____------__----___---____--____--____--____-------------____--___---___--___-____-----------___--___----__---__---__--____---
//add a new friends. Friends is notified then may add.
app.get('/add',(req,res)=>{


  var msg=new Message({_id:data.id.sender,

    message:{id:data.id.receiver,who:true,content:data.data} }
  )
  msg.save(function(err, Message){
    if(err)
    console.log('show_message',"Database error",err);
    else
    console.log('show_message', {
      message: "New person added", type: "success", person: msg.message});
    });
  })

  app.get('/:user/user',(req,res)=>{let buff = fs.readFileSync(path.join(__dirname, 'src/component/images/', req.params.user+'.jpeg'));
  let base64data = buff.toString('base64');
  var id=parseInt(req.params.user)
  Person.findOne({_id:id},{"name":1},(err,result)=>{
    res.send({name:result.name,image:base64data})
  })


})

app.post('/delete',(req,res)=>{
  var id=parseInt(req.body.user_id)
  console.log(req.body)
  if (req.body.post_id!=1) {
    console.log("hello")
    Person.update(
      { _id:id},
      { $pull:{post: {_id:req.body.post_id} }},
      (err,result)=>{if(err){console.log(err)} else {
        console.log(result);
      }}
    )
  }

})

app.get('/*',function (req, res){
console.log('Cookies: ', req);
res.cookie('name', 'express').sendFile(path.join(__dirname, 'build', 'index.html'));
})
var os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}
process.env.REACT_APP_PUBLIC_URL="hello"
console.log("process",process.env.REACT_APP_PUBLIC_URL);

  http.listen(8000,addresses[0], function() {  //,'192.168.1.18'
    console.log('listening on'+addresses[0]+':8000');
  });
