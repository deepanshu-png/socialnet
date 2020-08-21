import Image from 'react-bootstrap/Image'
import React from 'react';
import {Container,Col,Row,OverlayTrigger,Popover} from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge'
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './Chat.js'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import io from 'socket.io-client';
var ip={ip:process.env.REACT_APP_PUBLIC_URL,PORT:process.env.REACT_APP_PORT}
const socket = io('http://'+ip.ip+':'+ip.PORT+'/chat');

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {image:[],popover:'',id:this.props.id,id_online:[],check:[],name:[],img:[],fetch:false,status:[],empty:false};  //id of this client loggedin
    socket.emit('status',this.state.id)
    socket.on('status',data=>{
      console.log("received ",data);
      var check=this.state.check;
      console.log("1 check",check);
      check[data.id]=data.online;
      console.log("2 check",check);
      this.setState({check:check})
    })
    socket.on('join',data=>{
      console.log("hellow");
      props.message(data.name)
      socket.emit('join',data.room)
    })
    }

  componentDidMount(){


  if(window.innerWidth<600){
  this.setState({popover:"top"})
  console.log(this.state.screen,window.innerWidth,"if")
  }
 else  {console.log(this.state.screen,window.innerWidth,"else"); this.setState({popover:"left"})}
  var id=this.state.id
  if(localStorage.fetch!==1){socket.emit("/friends",this.state.id);
  socket.on("friends",(res)=>{
  var i=0;
  var len=res.length
  console.log();
if (len===0) {
  this.setState({
    empty:true
  });
}else {
  while(i<len){
  var base64Icon = 'data:image/png;base64,'+res[i].image;
  var name=this.state.name;
  name.push(res[i].name)
  var img=this.state.img;
  img.push(base64Icon)
  var id_online=this.state.id_online;
  id_online.push(res[i].status.id);
  var check={...check,[res[i].status.id]:res[i].status.online}
  this.setState({id_online:id_online,img:img,name:name,check:check,list:[]})
 ;
   i=i+1;}
}
localStorage.fetch=1

 })}
 }


popover(name,id){
  var recv=parseInt(this.props.id)
return (<Popover id={name}>
            <Popover.Title as="h3">{`Message `+name}</Popover.Title>
            <Popover.Content>
            <Chat socket={socket} id={{sender:id,receiver:recv}} status={this.state.status} online={
                this.state.check[id]
              } />
            </Popover.Content>
          </Popover>)
}

  render() {
    return (<Container ><style type="text/css">
    {`img {}

   span.block{display:block;
    border-style: solid;
     border-width: 1px 2px;
     background-color:LightGray;
   }

    @media only screen and (max-width: 500px) {
  span2 {

    display:none;
  }
  span.block{
  width:115%;
  }


    }
  divlater{
    white-space: nowrap;
     overflow: auto;

						//display:inline causing scroll hide
   }


}`}
</style>
<Card border="light" style={{position:"relative",boxShadow:"5px 10px 7px #888888",minWidth:"120px"}}>
  <Card.Header></Card.Header>
  <ListGroup variant="flush">
  {this.state.empty?<ListGroup.Item>Add New Friends</ListGroup.Item>:this.state.id_online.map((txt,index) => <ListGroup.Item variant="light" style={{padding:"7px"}}>
  <Row><Col md={5}>  <OverlayTrigger placement="left" onHide={()=>{socket.emit('msgreq',{id:this.props.id.sender,status:false})}} trigger="click" overlay={this.popover(this.state.name[index],this.state.id_online[index])} >
      <Image src={this.state.img[index]} width="60px"  height="60px"   roundedCircle  />
    </OverlayTrigger>
</Col>
    <Col  md={1} style={{position:'relative'}}> <Badge variant={this.state.check[this.state.id_online[index]]?"success":"secondary"} style={{marginLeft:"10px"}}>{this.state.name[index]}</Badge>
      </Col></Row>
    </ListGroup.Item>)}
  </ListGroup>
</Card>
</Container>

    );
}
}

export default Message;
//socket.emit('create', this.state.id);
//<button onClick={()=>{this.setState({isOnline:[...this.state.isOnline,3]});console.log("button online"+this.state.isOnline)}}>Click</button>
// {
//   this.state.id_online.map((txt,index) => <span className="block">
//   <OverlayTrigger placement="left"   trigger="click" overlay={this.popover(this.state.name[index],this.state.id_online[index])} >
//     <Image src={this.state.img[index]} width="60px"  height="60px"   roundedCircle  />
//   </OverlayTrigger>
//   <span2>
//     <Badge variant={this.state.check[this.state.id_online[index]]?"success":"secondary"}>{this.state.name[index]}{index}</Badge>
//   </span2></span>)
// }
