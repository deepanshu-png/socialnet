import React from 'react';
import {Container,Col,Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import {Form} from 'react-bootstrap'
import {IoIosPerson} from 'react-icons/io';
import sky from './images/sky.jpg'
const axios = require('axios');
var ip={ip:process.env.REACT_APP_PUBLIC_URL,PORT:process.env.REACT_APP_PORT}

class Login extends React.Component{
constructor(props){super(props);
this.state={name:'',pass:'',validated:false}
this.handleSubmit=this.handleSubmit.bind(this);
this.handleChange1=this.handleChange1.bind(this);
this.handleChange2=this.handleChange2.bind(this);}
handleSubmit(e,props){
const form = e.currentTarget;
if (form.checkValidity()===false) {console.log("here");
e.preventDefault();
e.stopPropagation();
}else {console.log("here");
  e.preventDefault();

  axios.post('http://'+ip.ip+':'+ip.PORT+'/signup', {
      name: this.state.name,
      pass: this.state.pass
    })
    .then((response)=>{
      console.log(response);

    if(response.data.status==="verified"){
      console.log("here");
    props.handler(response.data.id);
  } }
    ).catch(function (error) {
      console.log(error);
    });
}this.setState({validated:true})}
handleChange1(event){
this.setState({name:event.target.value})
}
handleChange2(event){
this.setState({pass:event.target.value})
}

render(){
return(
<Container><style type="text/css">
{`
  img{
    filter:blur(7px);
    z-index: -1;
    position: absolute;
  }
  .blur{
    filter:blur(0px);
  }
@keyframes example {
0%   {left:50%}
100% { left:0px}
}
`}
</style><Row><Col className="blur">
<Image className="img" src={sky} style={{borderRadius:"20px",marginLeft:"100px",marginTop:"-20px"}}/><div>Hello</div>
</Col></Row><Row><Col></Col><Col style={{color:"white"}}><br></br><br></br><br></br><Form noValidate validated={this.state.validated} onSubmit={(e) => {
     this.handleSubmit(e, this.props)}}>
   <Form.Group  noValidate controlId="formBasicEmail" onChange={this.handleChange1}>
    <IoIosPerson style={{height: "200px",width:"500px"}} /><Form.Label>New User Name *</Form.Label>
    <Form.Control required type="text" pattern="[A-Za-z]{3,20}" placeholder="Enter UserName" />
    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">
             Please provide a valid name.
           </Form.Control.Feedback>
           <Form.Text id="idHelpBlock" muted>
           * - required
         </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword" onChange={this.handleChange2}>
    <Form.Label>Password *</Form.Label>
    <Form.Control required type="password" placeholder="Password"  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}"/>
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
               Please provide a valid password.
             </Form.Control.Feedback>
      <Form.Text id="passwordHelpBlock" muted>
      Your password must be 8-20 characters long, contain letters and numbers, and
      must not contain spaces, special characters, or emoji.
    </Form.Text>
  </Form.Group>
  <Button variant="primary" type="submit">
    Signup
  </Button>
</Form></Col><Col></Col></Row></Container>

)
}
}
export default Login;
// <form onSubmit={(e) => {
//     this.handleSubmit(e, this.props)}} >
// <div5 style={{marginLeft:"10%"}} >
// Enter Id: <input type="text" onChange={this.handleChange1} id="id" name="id" /><br></br><br></br></div5>
//<div5 style={{marginLeft:"10%"}} >
// Enter Pass: <input type="password" onChange={this.handleChange2} id="pass" name="pass" /><br></br>
// <div5 style={{marginLeft:"10%"}} ><input type="submit" value="submit" /></div5>
// </div5>
//</form>
