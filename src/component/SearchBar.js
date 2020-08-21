import React from 'react';
import Image from 'react-bootstrap/Image'
import {Button,Dropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import io from 'socket.io-client';
import {IoIosSearch} from "react-icons/io";
import {Table} from 'react-bootstrap'
import {Form,FormControl} from 'react-bootstrap'
const axios = require('axios');
var ip={ip:process.env.REACT_APP_PUBLIC_URL,PORT:process.env.REACT_APP_PORT}
const socket = io('http://'+ip.ip+':'+ip.PORT);

class SearchBar extends React.Component {

constructor(props) {
  super(props);
   this.state={search:'',value:'',test:[],searchres:[]}
   this.change=this.change.bind(this)
   this.focus=this.focus.bind(this)
   this.addFriend=this.addFriend.bind(this)
   this.conformFriend=this.conformFriend.bind(this)
   this.blur=this.blur.bind(this)
   this.textInput = React.createRef();

 }
 componentDidMount(){
   socket.on('searchres',(data)=>{
     var i=0;
     var a=[]
     while(i<data.length){
     var base64Icon = 'data:image/png;base64,'+data[i].image;
     a.push({image:base64Icon,name:data[i].name,id:data[i].id})
     i++;
     }
     this.setState({searchres:a})
})
 }
 focus(event)
 {
   event.stopPropagation();

 }
 addFriend(id){
   axios.post('http://'+ip.ip+':'+ip.PORT+'/addfriend', {
       addid: id,
       senderid:localStorage.id,
       name:localStorage.name
     })
 }
 conformFriend(id){
   axios.post('http://'+ip.ip+':'+ip.PORT+'/conformfriend', {
       addid: id,
       senderid:localStorage.id
     })
 }
 change(event)
 {

  this.setState({value:event.target.value})

   if(event.target.value.length===0)
   {
     this.setState({search:false})
   }
   else {
     {
       this.setState({
         search:true
       });
       socket.emit('search',event.target.value)
     }
   }
 }
   blur()
   {
   }
 render() {

   return (
     <><style type="text/css">
{`
.dropleft .dropdown-toggle::before{
  display:none;
}
h1{
  font-size:12px
}

`}

</style>
<Dropdown drop="left">
<Dropdown.Toggle   size="lg"variant="warning" id="dropdown-basic">
<IoIosSearch />
</Dropdown.Toggle>

<Dropdown.Menu >
  <Dropdown.Item><Form inline onBlur={this.blur}>
    <FormControl ref={this.textInput} type="text" placeholder="Search" value={this.state.value} onClick={this.focus} onChange={this.change} autoFocus  />
    </Form>
    </Dropdown.Item>

    <Dropdown.Divider />
<Table responsive hover ><tbody> {this.state.search? this.state.searchres.map((txt)=><tr key={txt.id} > <td ><Image src={txt.image} width="30px"  height="30px"   roundedCircle  /></td>
<td>{txt.name}</td>
<td><Button style={{width:"60px",height:"30px",padding:"0"}} onClick={()=>this.addFriend(txt.id)}><h1> Add friend</h1></Button></td></tr> )
 :<Dropdown.Item>{"Search"}</Dropdown.Item>}</tbody></Table>

    </Dropdown.Menu>
</Dropdown>
</>

   )
 }
}
export default SearchBar;
