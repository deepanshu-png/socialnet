import React from 'react';
import {Container,Col,Row,Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
var ip={ip:process.env.REACT_APP_PUBLIC_URL,PORT:process.env.REACT_APP_PORT}

class createPost extends React.Component{
constructor(props){
super(props);
this.state={content:""}
this.handleSubmit=this.handleSubmit.bind(this)
this.handleChange=this.handleChange.bind(this)
}
handleChange(e){
  this.setState({content:e.target.value})
}
handleSubmit(e){
e.preventDefault();
  axios.post('http://'+ip.ip+':'+ip.PORT+'/post', {
      id:this.props.id,
      content:this.state.content
    })
}

render(){

return(<>
  <Container>
  <Row style={{boxShadow:"1px 4px 7px #888888",borderRadius:"10px"}}>
  <Col md={12} xs={12} >{"Create Your Post-"}
  <Form  onSubmit={this.handleSubmit}>
  <Form.Control as="textarea" required placeholder="Search" style={{width:"100%"}} maxlength="350" minlength="1" onChange={this.handleChange}/>
  <Button type="submit" style={{float:"right",width:"45px",padding:"0",marginTop:"10px"}}>Post</Button><br></br><br></br>
  </Form>
  </Col>
</Row>
  </Container>
<br></br>

</>)}
}
export default createPost;

//<Row><Col><div1>Post<like><IoMdThumbsUp /></like><comment><IoMdText /></comment></div1><div>Post</div></Col></Row>
