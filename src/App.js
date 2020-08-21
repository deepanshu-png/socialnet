import React from 'react';


import {Button,ButtonGroup} from 'react-bootstrap';
import Signup from './component/Signup.js'
import Login from './component/Login.js'
import Homepg from './component/Homepg.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav} from 'react-bootstrap'
import {
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import io from 'socket.io-client';
import ip from './component/ip.js';
const socket = io('http://'+ip.ip+':'+ip.PORT);

class App extends React.Component {

constructor(props) {
  super(props);
   this.state={authenticated:false,id:'',type:"hidden",notification:localStorage.notification,message:false,number:2}
   this.handler=this.handler.bind(this)
   this.handleClick=this.handleClick.bind(this)
   }
   componentDidMount(){
     this.setState({
       authenticated:localStorage.verified
     });

   localStorage.fetch=0}

    handler(id)
    {
      localStorage.setItem("verified",true)
      localStorage.setItem("id",id)
    this.setState({authenticated:localStorage.verified,id:localStorage.id})

    }
    handleClick(e){
    socket.emit('hello')
      localStorage.clear();
 this.setState({
   authenticated:false
 });
    }
  render() {
    const Homepage = (props) => {
         return (
           <Homepg
            id={localStorage.id}
             {...props}
             auth={this.handleClick}
           />
         );
       }
       const MyLogin = (props) => {
            return (
              <Login
               handler={this.handler}
                {...props}
              />
            );
          }
    return ( <><style type="text/css">
{`
.dropdown-toggle::after{
 display:none;
}
`}

</style><div style={{marginTop:"50px",backgroundColor:localStorage.verified==="true"?"white":"black",height:"1000px",overflow:"hidden"}}><Navbar fixed="top" style={{background:"linear-gradient(25deg,#000411,Blue)"}} variant="dark">
   <div style={{borderStyle:"double"}}> <Navbar.Brand href="#home"><b>&nbsp;&nbsp;SocialNet</b></Navbar.Brand></div>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>

    </Nav>
     {this.state.authenticated==="true" ?<>
    </>:<ButtonGroup  variant="primary"><Link to='/login'><Button>Login</Button></Link><Link to='/signup'><Button >SignUp</Button></Link></ButtonGroup>
}

</Navbar><br></br>{console.log("process",process.env)}

     <Switch>
          <Route exact path='/'>
           {localStorage.verified==="true" ?<Redirect to="/dashboard"  />:<Redirect to='/login'/>}
          </Route>
          {localStorage.verified==="true"?<Route  exact path="/dashboard" component={Homepage} />:''}

          {localStorage.verified!=="true"?<Route exact path="/login" component={MyLogin} />:<Redirect to="/dashboard"  />}
          <Route exact path="/signup">
          <Signup handler={this.handler} />
        </Route>
        <Route path='*'>
        <Redirect to="/"  />
      </Route>
      </Switch>
</div>
  </>
)
}
}




export default App;
