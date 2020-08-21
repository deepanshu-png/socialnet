import React from 'react';
import Image from 'react-bootstrap/Image'
import {Container,Col,Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

class User extends React.Component {
  constructor(props) {
    super(props);
}
render(){
return(<><Col xs={2}  sm={8} md={12}>Image</Col><Col xs={8} sm={8}md={12}>Name</Col></>)
}
}
export default User;
