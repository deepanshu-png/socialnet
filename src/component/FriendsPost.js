import React from 'react';
import {Container,Col,Row,Form,FormControl} from 'react-bootstrap';
import {IoMdThumbsUp,IoMdText,IoIosShareAlt,IoMdTrash} from 'react-icons/io';
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import {Tooltip,OverlayTrigger} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Comment from './Comment.js'
import ip from './ip.js';
import axios from 'axios'

class FriendsPost extends React.Component{
constructor(props){
super(props);
this.state={variant:"primary",liked:[],comments:[],show:[],media:[],post:[],modal:false,del:''}
this.handleClick=this.handleClick.bind(this)
this.commentShow=this.commentShow.bind(this)
this.getPost=this.getPost.bind(this)
this.handleShow=this.handleShow.bind(this)
}
componentDidMount(){

axios.get("http://"+ip.ip+":"+ip.PORT+"/"+localStorage.id+"/getfriendspost").then(res=>{
  console.log("data is",res.data);
if(res.data=="null"){
  console.log("here");
  this.setState({
    post:null
  });
}
else {

  var len=res.data.length;
console.log("here",len);
  var i=0;
  while(i<len){
  var len2=res.data[i].finalpost.length
  var j=0
  var base64Icon = 'data:image/png;base64,'+res.data[i].image;
    while(j<len2){
      console.log("here");
      this.setState({
        post: [...this.state.post,{id:res.data[i]._id,postid:res.data[i].finalpost[j]._id,name:res.data[i].name,image:base64Icon,post_id:res.data[i].finalpost[j].post,content:res.data[i].finalpost[j].content,date:res.data[i].finalpost[j].date.slice(0,10),likes:res.data[i].finalpost[j].likes}]
      });
      this.state.liked.push(false)
      this.state.show.push(false)
      this.state.media.push(null)
    j++}
    i++;}}})
console.log("sending")
console.log("post is"+this.state.post);
}
handleClick(id,pid,i){
  var l=this.state.liked;
if(l[i]){ l[i]=false;this.setState({liked:l})}
else {l[i]=true ;this.setState({liked:l})}

  axios.post("http://"+ip.ip+":"+ip.PORT+'/like',{
    liked:this.state.liked[i],
    userpost:pid,
    whos:id,
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

commentShow(id,pid,name,index){
var comment_show=this.state.show
var media=this.state.media;
comment_show[index]=!comment_show[index]
this.setState({show:comment_show})
if(this.state.show[index]) {
  media[index]=<Comment name={localStorage.name} user={id} post={pid} />;
  this.setState({media:media})}
else {
    media[index]=null
    this.setState({media:media})};

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
      font-size: 8px;

      color: grey;

    }


  }


   `}
 </style>
{this.state.post.map((txt,index)=><><div style={{boxShadow:"lightgrey 0px 0px 21px",borderRadius:"12px"}}><Row><Col md={3}><Image src={txt.image} width="30px"  height="30px" roundedCircle/></Col>
<Col md={3}>{txt.name}</Col><Col md={{span:1,offset:5}}>

</Col></Row>
<Row noGutters="true" ><Col md={12} ><Card body>{txt.content}<Row>
    <Col ><div2>{txt.date}</div2></Col>
  </Row></Card></Col></Row>
  <Row noGutters="true"><Col xs={4} md={4}>
    <Button style={pad}variant="light" size="sm" onClick={()=>this.handleClick(txt.id,txt.postid,index)}><IoMdThumbsUp /> <div2> {'Like'}
</div2>
 <Badge variant={this.state.liked[index]?"primary":"light" } >{txt.likes}</Badge></Button></Col>
 <Col xs={4} md={4}><Button style={pad} variant="light" size="sm" onClick={()=>{this.commentShow(txt.id,txt.postid,txt.name,index)}}><IoMdText />
 <div2>{'Comment'}</div2>
   <Badge variant="light" >{this.state.comments}</Badge></Button></Col>
   <Col xs={4} md={4}><Button style={pad} variant="light" size="sm"><IoIosShareAlt />
   <div2>{'Share'}</div2></Button></Col>{this.state.media[index]}</Row></div><br></br></>)}</>)}
}
export default FriendsPost;

//<Row><Col><div1>Post<like><IoMdThumbsUp /></like><comment><IoMdText /></comment></div1><div>Post</div></Col></Row>
