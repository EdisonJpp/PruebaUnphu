import React from 'react';
import FormAndUser from './componets/formAndUser';
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import Login from './componets/login';
import './App.css';
import Start from './componets/start';
import UserList from './componets/UserList';
import Formulario from './componets/formulario';

class App extends React.PureComponent {

  render() {
    return (
      <div className='App'>
        <BrowserRouter >
        <Switch>
          <Route exact path='/login' component={Login} />

          <Start >
            <Route exact path='/formAndUser' component={FormAndUser} />
            <Route exact path='/formAndUser/:document' component={withRouter(FormAndUser)} />
            <Route exact path='/userList' component={UserList} />
            <Route exact path='/formulario' component={Formulario} />
          </Start>
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;  