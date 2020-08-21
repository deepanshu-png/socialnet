import React from 'react';
import {Col,Row} from 'react-bootstrap';
import {IoMdThumbsUp,IoMdText,IoIosShareAlt,IoMdTrash} from 'react-icons/io';
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import {Tooltip} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
import Comment from './Comment.js'
import axios from 'axios'
var ip={ip:process.env.REACT_APP_PUBLIC_URL,PORT:process.env.REACT_APP_PORT}

class Post extends React.Component{
constructor(props){
super(props);
this.state={variant:"primary",liked:[],comments:[],show:[],media:[],post:[],modal:false,del:'',check:false}
this.handleClick=this.handleClick.bind(this)
this.handleDelete=this.handleDelete.bind(this)
this.commentShow=this.commentShow.bind(this)
this.getPost=this.getPost.bind(this)
this.handleShow=this.handleShow.bind(this)
this.check=this.check.bind(this)
}
componentDidMount(){

axios.get("http://"+ip.ip+":"+ip.PORT+"/"+this.props.id+"/post").then(res=>{
  console.log(res.data);
  var len=res.data.length;
  var i=0;
  while(i<len){
  this.setState({post:[...this.state.post,{id:res.data[i]._id,content:res.data[i].content,date:res.data[i].date.slice(0,10),likes:res.data[i].likes,comments:res.data[i].comments}]})

  this.state.liked.push(false)
  this.state.show.push(false)
  this.state.media.push(null)
i++;}

console.log("post is"+this.state.post+"len"+len);
}
)
console.log("sending")
}
handleClick(props,i){
  var l=this.state.liked;
if(l[i]){ l[i]=false;this.setState({liked:l})}
else {l[i]=true ;this.setState({liked:l})}

  axios.post("http://"+ip.ip+":"+ip.PORT+'/like',{
    liked:this.state.liked[i]?1:-1,
    userpost:props,
    whos:localStorage.id
  })

}
handleShow(props)
{
  this.setState({
    del: props,modal:true
  });

}
handleLike(){}
handleComment(){}
handleDelete(){
console.log("delete")
axios.post('http://'+ip.ip+':'+ip.PORT+'/delete', {
    post_id:this.state.del
  ,  user_id:localStorage.id
  })
  this.setState({
    modal:false
  })}
commentShow(id,index){
console.log("stateis",this.state)
var userid=parseInt(localStorage.id)
var comment_show=this.state.show
var media=this.state.media;
comment_show[index]=!comment_show[index]
this.setState({show:comment_show})
if(this.state.show[index]) {
  media[index]=<Comment name={this.props.name} user={userid} post={id} />;
  this.setState({media:media})}
else {
    media[index]=null
    this.setState({media:media})};

}
check(){
  this.setState({
    check:!this.state.check
  });
}
getPost(){


}
renderTooltip(props) {
  return (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );
}
render(){
const pad={paddingTop:"0%"}
return(<>
  <style type="text/css">{
      `
      div1 {
        height:100px;
        display: flex;
        background-color: DodgerBlue;display: flex;
        position: relative;
      }
      like {
        border: 1px solid black;
        background-color: lightblue;
        top: 75px;
        position: absolute;
        max-width: 50px;
        height:40px;
        margin-left:20px;
        transform: scale(1.3);
      }
      comment{  border: 1px solid black;
        background-color: lightblue;
        top: 75px;
        position: absolute;
        max-width: 50px;
        height:40px;
        margin-left:170px;
        transform: scale(1.3);

      }
      share{
        border: 1px solid black;
        background-color: lightblue;
        top: 90px;
        position: absolute;
        max-width: 510px;
        height:34px;
        margin-left:400px;
        box-sizing: border-box;
        transform: scale(1.3);
      }
      span {

        transition: background-color .5s;
      }

      span:hover {
        background-color: #d1d1e0;
      }
      Button
      {

        width:100%;
      }
      @media only screen and (max-width: 600px) and (orientation:portrait) {
        like {

          transform: scale(1.2);
        }
        Button
        {
          width:100%;


        }

      }


      @media only screen and (max-width: 900px) and (orientation:landscape) {
        like {

          transform: scale(1.2);
        }
        Button
        {
          width:100%;



        }

      }

    }
    @media only screen and (max-width: 300px)and (orientation:landscape)  {
      like {

        transform: scale(1.2);
      }


    }

    div2 {
      font-size: 12px;

      color: grey;

    }


  }


   `}
  </style>
<Modal show={this.state.modal} onHide={()=>this.setState({
  show:false
})} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title><h5>Confirm delete</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>This post will be permanently deleted</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>this.setState({
            modal:false
          })}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleDelete}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>{this.state.post.map((txt,index)=><><div style={{boxShadow:"lightgrey 0px 0px 21px",borderRadius:"12px"}}><Row ><Col md={1} style={{marginBottom:"10px"}}><Image src={localStorage.image} width="30px"  height="30px"   roundedCircle  /></Col>
    <Col md={3} style={{marginTop:"5px"}}>{localStorage.name}</Col><Col md={{span:1,offset:7}}>

     <Button variant="light" style={{padding:"0px",width:"16px",borderRadius:"5px",border:"none"}} onClick={()=>this.handleShow(txt.id)}><IoMdTrash /></Button>

</Col></Row>
<Row noGutters="true" ><Col md={12} ><Card body>{txt.content}<Row>
    <Col ><div2>{txt.date}</div2></Col>
  </Row></Card></Col></Row>
  <Row noGutters="true"><Col xs={4} md={4}>
    <Button style={pad}variant="light" size="sm" onClick={()=>this.handleClick(txt.id,index)}><IoMdThumbsUp /> <div2> {'Like'}
</div2>
 <Badge variant={this.state.liked[index]?"primary":"light" } >{txt.likes}</Badge></Button></Col>
 <Col xs={4} md={4}><Button style={pad} variant="light" size="sm" onClick={()=>{this.commentShow(txt.id,index)}}><IoMdText />
 <div2>{'Comment'}</div2>
   </Button></Col>
   <Col xs={4} md={4}><Button style={pad} variant="light" size="sm"><IoIosShareAlt />
   <div2>{'Share'}</div2></Button></Col>{this.state.media[index]}</Row></div><br></br></>)}</>)}
}
export default Post;

//<Row><Col><div1>Post<like><IoMdThumbsUp /></like><comment><IoMdText /></comment></div1><div>Post</div></Col></Row>
