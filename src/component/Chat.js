import React from 'react';
import {Container,Col,Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {a:false,name:"abc",value1:"",msg:"",elem:"",value2: '',text:null,typing:false};
    this.handleChange1 = this.handleChange1.bind(this);

    this.handleSubmit1 = this.handleSubmit1.bind(this);

    this.offline=this.offline.bind(this);

    this.props.socket.emit('chat',{id:props.id.sender,name:localStorage.name,id2:localStorage.id})
    this.props.socket.on('typing',data=>{
      if (data.id===this.props.id.sender&&data.id2===localStorage.id) {

        this.setState({
          typing1:data.data
        });
      }
    })
      this.props.socket.on('message',data=>
      {if (data.id===this.props.id.sender&&data.id2===localStorage.id) {
        var element=<><h5><Badge variant="success" style={{float:"left"}}>{data.data}</Badge></h5><br></br><br></br></>;
        this.setState({elem:[...this.state.elem,element]})
      }

      }
    )
  }


  handleChange1(event) {   console.log(this.props.id); this.setState({value1: event.target.value,typing:true});
                          this.props.socket.emit('typing',{id:this.props.id.sender,typing:true,id2:localStorage.id})
                        }

  handleSubmit1(event) {
    //alert('A name was submitted: ' + this.state.value);
    if(this.state.text===null){this.setState({text:this.state.value})} else{
    this.setState({text: this.state.value1})}					//don't take input from text
var element=<><h5><Badge variant="primary" style={{float:"right",right:"0px",position:"absolute"}}>{this.state.value1}</Badge></h5><br></br><br></br></>;
  this.setState({elem:[...this.state.elem,element]})
     this.setState({typing1:false})
     this.props.socket.emit('sendmessage',
   {
     id:this.props.id.sender,data:this.state.value1,id2:localStorage.id
   })

    event.preventDefault();
  }
  offline(){
  this.props.socket.emit('typing',{id:this.props.id.sender,typing:false,id2:localStorage.id})
}					//is undefined without binding

  render() {
    return (<Container ><style type="text/css">{`
    h1 {
  font-size: 10px;
}`}
</style><Row><div2><Col>
{this.state.elem}
      <h1> {this.state.typing1?<>{'Typing'}<Spinner animation="grow" style={{height:"10px",width:"10px"}} /></>:''}</h1>
      <form onSubmit={this.handleSubmit1}>
        <label>
          <input type="text" value={this.state.value1} onChange={this.handleChange1} onFocus={this.offline} onBlur={this.offline}  /> </label>
        <input type="submit" value="Submit" />
      </form>

     <Button variant="flat">

  <span className="sr-only">unread messages</span>
</Button>     </Col>


     </div2></Row>
     </Container>

    );
  }
}

export default App;
