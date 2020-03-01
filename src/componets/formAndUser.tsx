import React from 'react';
import Formulario from './formulario';
import { User } from '../data/users';
import { RouteComponentProps } from 'react-router-dom';
import UsersCreados from './createdUser';


interface Iprops extends RouteComponentProps<any> {
};
interface IState {
  users: User[];
  currentPage: 1;
  usersPerPage: 4;

};
class FormAndUser extends React.Component<Iprops, IState>{

  constructor(props: Iprops) {
    super(props);
    const uusers = JSON.parse(localStorage.getItem('users') || '[]');
    this.state = {
      users: uusers,
      currentPage: 1,
      usersPerPage: 4
    };
  };
  addANewUser = (user: User) => {
    let userData = JSON.parse(localStorage.getItem('users') || '[]');
    userData.push(user);
    localStorage.setItem('users', JSON.stringify(userData));
    if (userData) {
      this.setState({
        users: userData
      });
    };
    this.setState({
      users: [...this.state.users, userData]
    });
    this.redirect2();
  };

  redirect2 = () => this.props.history.push('/userList');
  redirect = () => this.props.history.push('/login');

  edit = (element: User) => {
    const { document } = element;
    this.props.history.push('/formAndUser/' + document);
  };
  deleteATasks = (element: any) => {
    const users = JSON.parse(localStorage.getItem('users')!);
    if (window.confirm('are you sure, do you want to delete this user')) {
      let uuser =
        users.filter((user: string, i: number) => {
          return i !== element
        });
      localStorage.setItem('users', JSON.stringify(uuser));
      this.setState({
        users: uuser
      });
      this.redirect2();
    };
  };
  
  render() {
    return (
      <div className='loscard'>
        <div className='h-50'>
          <Formulario addANewUser={this.addANewUser} />
        </div>
        <div className=''>

          <UsersCreados
            deleteATasks={this.deleteATasks}
            edit={this.edit}
          />
        </div>
      </div>
    );
  };
};

export default FormAndUser;
