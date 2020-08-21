import React from 'react';
import Login from './../component/Post.js'
import Homepg from './../component/FriendsPost.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
  useHistory
} from "react-router-dom";
class Routes extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Router>
       <Switch>
       <Route exact  path='/home' >
       <FriendsPost id={localStorage.id}/>
      </Route>
       </Switch>
       </Router>
    );
  }
}
export default Routes;
