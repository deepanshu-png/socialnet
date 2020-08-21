import React from 'react';
import {Container,Col,Row} from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';

class Msg extends React.Component{
constructor(props){super((props))
this.state={a:props}}
render(){
return (<Row><Badge variant="success">{this.state.a.props}</Badge></Row>)
}}

export default Msg;
