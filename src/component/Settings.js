import React from 'react';
import Card from 'react-bootstrap/Card'
import Figure from 'react-bootstrap/Figure'
import axios from 'axios'
import {IoIosBrush} from 'react-icons/io'
import {Form} from 'react-bootstrap'
import {Container,Col,Row} from 'react-bootstrap';
var ip={ip:process.env.REACT_APP_PUBLIC_URL,PORT:process.env.REACT_APP_PORT}

class Setting extends React.Component {
  constructor(props){
    super(props);
    this.handleClick=this.handleClick.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handleNameChange=this.handleNameChange.bind(this)
    this.nameChange=this.nameChange.bind(this)
    this.state={file:'',name:''}
  }
  handleChange(e){

    this.setState({
      file:e.target.files[0]
    });
  }
  handleClick(e){

    const formData = new FormData();

      // Update the formData object
      formData.append(
        "myFile",
        this.state.file,
        `${localStorage.id}.jpeg`
      );


    axios.post('http://'+ip.ip+':'+ip.PORT+'/upload',formData)
  }
  nameChange(e){
    this.setState({
      name:e.target.value
    });
  }
  handleNameChange(){
    axios.post('http://'+ip.ip+':'+ip.PORT+'/name',{id:localStorage.id,name:this.state.name})
  }
  render () {
  return(
    <Container><style type="text/css">
    {
      `img{
        transition:filter 0.5s
      }
      img:hover{
        filter:blur(3px)
      }`
    }</style><Row>
    <Col style={{marginRight:"1%",paddingBottom:"100%",boxShadow:"5px 10px 17px #888888"}}>
      <Card body>Change your profile picture and username</Card>
      <Card body className="text-center" style={{marginTop:"5px"}}>  <Figure>
    <Figure.Image
      className="img"
      width={171}
      height={180}
      src={localStorage.image}
    />
    <Figure.Caption>
      Change profile picture <IoIosBrush/><br></br>
    <form onSubmit={this.handleClick} enctype="multipart/form-data" >
    <label for="myfile">Select a file:</label><br></br>
    <input type="file" id="myfile"  onChange={this.handleChange} style={{border:"double"}} accept=".jpeg"/><br></br>
    <input style={{marginTop:"5px"}}type="submit" value="Submit" />
  </form>

    </Figure.Caption>
  </Figure>
  </Card>
<Card body style={{marginTop:"7px"}}>
  <Card.Title>You new username</Card.Title>
  <Form onSubmit={this.handleNameChange}>
    <Form.Control type="text" onChange={this.nameChange}  placeholder="Enter New UserName" required/>
      <Form.Control.Feedback type="invalid">
              Please provide a valid Name.
            </Form.Control.Feedback><br></br>
    <button type="submit">
      Submit
    </button>
  </Form>
</Card>


    </Col>
    </Row></Container>
  )
  }
}

export default Setting;
