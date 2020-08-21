import React from 'react'
import Media from 'react-bootstrap/Media'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import {IoIosPaperPlane} from "react-icons/io"
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import {Form,FormControl} from 'react-bootstrap'
import ip from './ip.js';
class Comment extends React.Component{
constructor(props)
{
 super(props);
  this.state={yourcomment:'',comment:[]}

this.handleChange=this.handleChange.bind(this);
this.handleSubmit=this.handleSubmit.bind(this);
}
componentDidMount(){
console.log(this.props.post)
  axios.post("http://"+ip.ip+":"+ip.PORT+"/comments",{
        post:this.props.post,
        user:this.props.user
  }).then((res)=>{
      console.log(res.data);
    var len=res.data.length
    var i=0;
    while(i<len){
      var base64Icon = 'data:image/png;base64,'+res.data[i].image;
      var comment={friendsname:res.data[i].name,friendscomment:res.data[i].comment,img:base64Icon}
      this.setState({
        comment:[...this.state.comment,comment]
      })
    i++}

  })
}
handleSubmit(e){
  e.preventDefault();
  axios.post("http://"+ip.ip+":"+ip.PORT+"/postcomment",{
    post:this.props.post,
    comment:this.state.yourcomment,
    name:this.props.name,
    userpost:this.props.user,
    user:localStorage.id

  })
}
handleChange(e){
  this.setState({
    yourcomment:e.target.value
  });
}
render(){
const style={


    marginTop: "-1%",
    paddingLeft: "2%",
    paddingRight: "1%",
    paddingBottom: "0%",
    width: "100%"

}
return(<Card.Footer style={style}>
  <style type="text/css">
    {
      `
      name{
        text-size:20px
      }
      .comment{
        font-size: 12px;

      }
      span{
        font-size: 20px;
      }
      .button {
        background-color: DodgerBlue;
        border: none;
        color: white;
        padding: 3px;
        width:50px;
        margin-left:10px;
        border-radius: 15px;
      }
      .button:hover {
        background-color: blue;
        color: white;
      }
      .textb{
        border-radius:12px;
        width:280px;
      }
      @media only screen and (max-width: 600px){
        .textb{
          border-radius:12px;
          width:180px;
          transform: scale(0.7);
          margin-left:-30px;
        }
        name{
          font-size: 15px;
        }
        .comment{
          font-size: 10px;

        }
        div3{

        }
        .button {

          width:30px;
          transform: scale(0.9);
        }

        `
      }
    </style>
<div3>  <Media >
    <Image
      width={30}
      height={30}
      className="mr-3"
      src={localStorage.image}
      roundedCircle
    />
    <Media.Body>
      <Form inline onBlur={this.blur}>
        <FormControl type="text" placeholder="Enter Comment"  style={{width:"80%",borderRadius:"12px",height:"30px"}} value={this.state.value} onChange={this.handleChange}  />

     <button className="button" type="submit" onClick={this.handleSubmit}><span><IoIosPaperPlane /></span></button>
    </Form>
    </Media.Body>
  </Media>
   {this.state.comment.map((txt)=>
<Media>
<Image
width={30}
height={30}
className="mr-3"
src={txt.img}
roundedCircle
/>
<Media.Body>
<name>{txt.friendsname}</name>
<p className="comment">
 {txt.friendscomment}
</p>
</Media.Body>
</Media>)}
  </div3></Card.Footer>)}
}


export default Comment;
