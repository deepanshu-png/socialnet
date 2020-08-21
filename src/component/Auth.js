import React from 'react';
import Image from 'react-bootstrap/Image'
import {Container,Col,Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge'
import Post from './component/Post.js'
import User from './component/User.js'
import Profile from './component/Profile.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import {Navbar,Nav} from 'react-bootstrap'
import {Form,FormControl} from 'react-bootstrap' 
import Message from './component/Message.js'
class Auth extends React.Component {
constructor(props){
super(props);
this.state={authenticated:false,id:''};
}
render(){
return(

