import React from 'react';
import Image from 'react-bootstrap/Image'
import {Container,Col,Row} from 'react-bootstrap';
import {Button,ButtonGroup,DropdownButton,Dropdown} from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge'
import Post from './Post.js'
import User from './User.js'
import Profile from './Profile.js'
import Pending from './Pending.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
import {Navbar,Nav} from 'react-bootstrap'
import {Form,FormControl} from 'react-bootstrap'
import SearchBar from './SearchBar.js'
import ip from './ip.js';
import {IoMdBulb,IoIosMailUnread,IoIosSettings,IoIosAperture,IoIosHome,IoLogoSnapchat,IoIosFootball,IoMdSettings} from "react-icons/io";
import Card from 'react-bootstrap/Card'
import Message from './Message.js'
import Setting from './Settings.js'
import CreatePost from './CreatePost.js'
import leaf from './images/leaf.jpg';
import FriendsPost from './FriendsPost.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
  useHistory,
  HashRouter
} from "react-router-dom";
class Homepg extends React.Component {

constructor(props) {
  super(props);

    this.state={screen:"",messagenumber:0,messageupdate:false,notificationnumber:0,message:[],notification:false,notif_no:0,check:false,name:'',display:'',button:"none",style:{


  border: '2px solid #000000',
  background:"blue"

}}
this.nameChange=this.nameChange.bind(this)
this.handleClick=this.handleClick.bind(this)
this.notification=this.notification.bind(this)
this.newMessage=this.newMessage.bind(this)


//    this.msg=this.msg.bind(this)
  }
  componentDidMount(){
    axios.post('http://'+ip.ip+':'+ip.PORT+'/notification', {
      user:localStorage.id
    }).then(res=>{console.log("notification",res);
      if (res.data.length!=0) {
        this.notification(res.data)
      }}
    )
  }
  notification(n){
    this.setState({
      notificationnumber:n.length,
      notification:n
          });

  }
newMessage(name){
  var message=this.state.message
  var number=this.state.messagenumber+1
  message.push(name)
  this.setState({
    messagenumber:number,
    message:message,
    messageupdate:true
  });
}

  nameChange(name){
    this.setState({
      name:name
    });
  }
  handleClick(){
    this.setState({
      number:0
    });
  }

//  componentDidMount(){
//  if(window.innerWidth<600){
//  this.setState({screen:"",display:"none",button:''})
//  console.log(this.state.screen,window.innerWidth,"if")
//  }
// else  { console.log(this.state.screen);this.setState({screen:""})}
// }
// msg(){
// if(this.state.display==""){
// this.setState({display:"none"})
// }
// else {
//   this.setState({display:""})

// }
//}

  render() {
    console.log(this.props);
    const You=(props)=>{
      return(<>
         <CreatePost id={this.props.id} {...props}/ ><Post name={this.state.name} id={this.props.id} notification={this.notification} />
         </>)
    }
    const Friends=(props)=>{
      return(<>
         <FriendsPost id={this.props.id} />
         </>)
    }
    const Settings=(props)=>{
      return(<>
         <Setting />
         </>)
    }
console.log(this.props);
    return (<Container style={{maxWidth:"2140px"}}>
    <Navbar fixed="top" style={{background:"linear-gradient(25deg,#000411,Blue)"}} variant="dark">
       <div style={{borderStyle:"double"}}> <Navbar.Brand href="#home"><b>&nbsp;&nbsp;SocialNet</b></Navbar.Brand></div>
         <Nav className="mr-auto">

          </Nav>
         <>
        <SearchBar />

      <ButtonGroup size="lg">

     <DropdownButton size="lg" variant="primary" onClick={this.handleClick} title={<><IoMdBulb /><Badge variant={this.state.notification?"success":"primary"}>{this.state.notificationnumber}</Badge></>} >
       {this.state.notificationnumber==0?<Dropdown.Item>{"No new Notification"}</Dropdown.Item>:this.state.notification.map((txt)=><Dropdown.Item>{txt.name}{" sent you a friend request"}</Dropdown.Item>)
       }
       </DropdownButton>
          <DropdownButton  size="lg" variant="primary" onClick={()=>this.setState({
            messagenumber:0
          })} title={<><IoIosMailUnread /><Badge variant={this.state.messagenumber==0?"primary":"success"}>{this.state.messagenumber}</Badge></>}>
            {this.state.messageupdate==0?<Dropdown.Item>{"No new message request"}</Dropdown.Item>:this.state.message.map((txt)=><Dropdown.Item>{txt}{" requested to chat"}</Dropdown.Item>)
            }
          </DropdownButton>
          <DropdownButton size="lg" as={ButtonGroup} variant="primary" title=<IoIosSettings /> id="bg-nested-dropdown">
        <Dropdown.Item ><Button onClick={this.props.auth}>Sign Out</Button></Dropdown.Item>
      </DropdownButton>
    </ButtonGroup></>



    </Navbar>

    <style type="text/css">{`button {
  position:relative;
  background-color:#73AD21
  }
  .dropdown-menu.show
  {
    left:-120px
  }
  .dropleft .dropdown-menu{

    left:auto;
  }
  a:hover{
    text-decoration:none
  }
  @media only screen and (max-width: 800px) {
  span{
    display:none
  }
}


`}
</style>
    <Row noGutters="true" ><Router>
    <Col xs={1} sm={1} md={3} style={{maxWidth:"fit-content",marginRight:"1%",paddingBottom:"100%",boxShadow:"5px 10px 17px #888888"}}>
    <Row>
    <Col xs={12} md={12}><Card className="text-center"><Profile name={this.nameChange} id={this.props.id}/>
    </Card><Col xs={3} md={12} style={{textAlign:"center"}}>{localStorage.name}</Col>
      <ListGroup variant="flush" style={{fontSize:"large",textAlign:"center"}}>
  <Link to={`${this.props.match.path}/Home`}><ListGroup.Item action href={`${this.props.match.path}/Home`}><IoIosHome/>{' '}<span>Home</span></ListGroup.Item></Link>
  <Link to={`${this.props.match.url}`}><ListGroup.Item action href={`${this.props.match.url}`}><IoLogoSnapchat />{' '}<span>Your Post</span></ListGroup.Item></Link>
  <Link to={`${this.props.match.url}/pending`}><ListGroup.Item action href={`${this.props.match.url}/pending`}><IoIosFootball/>{' '}<span>Pending Requests</span></ListGroup.Item></Link>
  <Link to={`${this.props.match.url}/remove`}><ListGroup.Item action href={`${this.props.match.url}/remove`}><IoIosAperture/>{' '}<span>Remove Friends</span></ListGroup.Item></Link>
  <Link to={`${this.props.match.url}/settings`}><ListGroup.Item action href={`${this.props.match.url}/settings`}><IoMdSettings/>{' '}<span>Settings</span></ListGroup.Item></Link>


</ListGroup>




    </Col>

    </Row></Col>

  <Col md={6} sm={8} xs={8}> <Switch>
  <Route exact path={`${this.props.match.path}`} children={You}/>
<Route exact path={`${this.props.match.path}/home`} component={Friends}/>
<Route exact path={`${this.props.match.path}/pending`} component={Pending}/>
<Route exact path={`${this.props.match.path}/settings`} component={Settings}/>
<Route exact path={`${this.props.match.path}/remove`} render={()=><div>ToDo</div>}/>
</Switch>

  </Col></Router>
<Col style={this.state.style} md={2} sm={2} xs={3}style={
        {display:this.state.display,marginLeft:"2%"}
      }
      className={this.state.screen}>
      <Message id={this.props.id} message={this.newMessage} /></Col></Row>
      <div className="fixed-bottom"><button onClick={this.msg} style={{display:this.state.button}}>Button</button></div>
    </Container> );
  }
}

export default Homepg;
//<Image className="img" src={leaf} style={{borderRadius:"20px",marginLeft:"100px",marginTop:"-20px",height:"100%",width:"100%",position:"absolute"}}/><div>Hello</div>
