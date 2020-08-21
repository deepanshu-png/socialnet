import React from 'react';
import Image from 'react-bootstrap/Image'
import ip from './ip.js';
const axios = require('axios');

class Profile extends React.Component{
constructor(props){
super(props);
this.state={name:'',image:''}
}
componentDidMount(){
axios.get('http://'+ip.ip+':'+ip.PORT+'/'+this.props.id+"/user/").then(res=>{var base64Icon = 'data:image/png;base64,'+res.data.image;
this.setState({image:base64Icon})
localStorage.image=this.state.image
localStorage.name=res.data.name
this.props.name(res.data.name);})


}
  render(){

  return(<Image src={this.state.image} style={{height:'auto',width:'100%'}} style={{borderRadius:"20px"}} fluid/>)
  }

  }
//
//function Profile(){
//var a;
//prof().then((res)=>{a=res;console.log("kjbob",res)});
//console.log("returning ",a)
//return a;

//}
export default Profile;
