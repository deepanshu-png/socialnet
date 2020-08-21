import React from 'react'
import Image from 'react-bootstrap/Image'
import {Row,Col} from 'react-bootstrap'
import ip from './ip.js'
import {IoIosCheckmarkCircle} from 'react-icons/io'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Pending extends React.Component{
  constructor(props){
    super(props);
    this.state={pending:'',image:[],name:'',id:'',status:[]}
}
componentDidMount(){
  try {
    axios.post('http://'+ip.ip+':'+ip.PORT+"/pending",{user:localStorage.id}).then(
    res=>{console.log(res.data=='');
      if (res.data=='') {

        this.setState({
          pending:false
        });
      } else {

        var len=res.data.length
        var i=0
        while(i<len){
        var base64Icon = 'data:image/png;base64,'+res.data[i].image;
        var image=this.state.image;
        var status=this.state.status
        status.push(false)
        image.push({_id:res.data[i].id,name:res.data[i].name,image:base64Icon})
        this.setState({pending:true,image:image,status:status})

        i++;}
      }
    }
    )

  } catch (e) {
    console.log("not done");
  }
}
  render () {
    return (<>
      {this.state.pending?this.state.image.map((txt,index)=>
      <Card body style={{boxShadow:"lightgrey 0px 0px 21px",borderRadius:"12px"}}> <Row><Col><Image src={txt.image} height="50px" width="50px"/>{' '}{txt.name}{" Sent you a friend request"}</Col><Col md={{ span: 3 }}><Button style={{marginRight:"0px"}}variant={this.state.status[index]?"success":"primary"} onClick={()=>{
          axios.post('http://'+ip.ip+':'+ip.PORT+"/conformfriend",{addid:localStorage.id,senderid:txt._id}).then(
          res=>{
            if (res.data="success") {
              var status=this.state.status;
              status[index]=true
              this.setState({
                status:status
              });
            }
          }
          ).catch(function (error) {
    // handle error
    console.log(error);
  })
}}>{this.state.status[index]?<IoIosCheckmarkCircle/>:"Add Friend"}</Button> </Col></Row></Card>
      ):<Card body>Not Pending</Card>
      }

  </>  )
  }
}

export default Pending;
