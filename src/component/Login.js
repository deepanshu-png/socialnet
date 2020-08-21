import React from 'react';
import {Container,Col,Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import {Form} from 'react-bootstrap'
import {IoIosPerson} from 'react-icons/io';
import rain from './images/rain.jpg';
const axios = require('axios');
var ip={ip:process.env.REACT_APP_PUBLIC_URL,PORT:process.env.REACT_APP_PORT}

class Login extends React.Component{
constructor(props){super(props);
this.state={name:'',pass:'',validated:false,modal:false}
this.handleSubmit=this.handleSubmit.bind(this);
this.handleChange1=this.handleChange1.bind(this);
this.handleChange2=this.handleChange2.bind(this);}

handleSubmit(e,props){
e.preventDefault();
this.setState({validated:true})
var form=e.currentTarget;
if(form.checkValidity()===false){
  e.stopPropagation();
  e.preventDefault();
}else {

  axios.post('http://'+ip.ip+':'+ip.PORT+'/verify', {
      name: this.state.name,
      pass: this.state.pass
    }).then((response)=> {
      console.log(response);
    if(response.data.status==="verified"){
      console.log("verified",response.data.id);
    props.handler(response.data.id);
  } else {
    console.log(this.state);
  this.setState({
    modal:true
  });
  console.log(this.state);
  }}).catch(function (error) {
      console.log(error);
    });
}
}
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
</style><Modal show={this.state.modal} onHide={()=>this.setState({
  modal:false
})} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title><h5>Not Verified</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>Sorry try again</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>this.setState({
            modal:false
          })}>
            Close
          </Button>

        </Modal.Footer>
      </Modal><Row><Col className="blur">
<Image className="img" src={rain} style={{borderRadius:"20px",marginLeft:"100px",marginTop:"-20px"}}/><div>Hello</div>
</Col>
<Col className="blur" style={{animationName:"example",animationDuration:"2s",color:"white"}}><br></br><br></br><br></br>
<Form noValidate validated={this.state.validated} onSubmit={(e) => {
     this.handleSubmit(e, this.props)}}>
  <Form.Group controlId="formBasicEmail" onChange={this.handleChange1}>
    <IoIosPerson style={{height: "200px",width:"500px"}} /><Form.Label>User ID *</Form.Label>
    <Form.Control required type="text" placeholder="Enter Id" pattern="[A-Za-z]{3,20}"  />
    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">
             Please provide a valid id.
           </Form.Control.Feedback>
           <Form.Text id="idHelpBlock" muted>
           * - required
         </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword" onChange={this.handleChange2}>
    <Form.Label>Password *</Form.Label>
    <Form.Control required type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}" placeholder="Password" />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
               Please provide a valid password.
             </Form.Control.Feedback>
      <Form.Text id="passwordHelpBlock" muted>
      Your password must be 8-20 characters long, contain letters and numbers, and
      must not contain spaces, special characters, or emoji.
    </Form.Text>
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
  <Link to='/signup'><Button style={{marginLeft:"50px"}}>Signup</Button></Link>
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
