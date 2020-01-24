import React from 'react';
import Formulario from './formulario';
import { User } from '../data/users';
import { RouteComponentProps, withRouter } from 'react-router-dom';


class FormAndUser extends React.Component<Iprops, IState>{

  constructor(props: Iprops) {
    super(props);
    const uusers = JSON.parse(localStorage.getItem('users') || "{}");

    this.state = {
      users: [] || uusers,
      currentPage: 1,
      usersPerPage: 4
    }
  }
  addANewUser = (user: User) => {
    let userData = JSON.parse(localStorage.getItem('users')!)
    if (!userData) {
      userData = []
    }
    userData.push(user);
    localStorage.setItem('users', JSON.stringify(userData));
    if (userData) {
      this.setState({
        users: userData
      })
    }
    this.setState({
      users: [...this.state.users, userData]
    });
    this.redirect2();
  }

  redirect2 = () => this.props.history.push('/userList');
  redirect = () => this.props.history.push('/login');

  edit = (element: any) => {
    const { document } = element;
    this.props.history.push('/formAndUser/' + document);
  }

  handleClick = (evento: any) => {
    this.setState({
      currentPage: (evento.target.value)
    });

  }

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
    }
  }

  render() {
    const { currentPage, usersPerPage } = this.state;
    const indexOfLastUsers = currentPage * usersPerPage;
    const indexOfFirtUsers = indexOfLastUsers - usersPerPage;
    const currentUsersPage = this.state.users.slice(indexOfFirtUsers, indexOfLastUsers);

    const renderCurrentUsersPage = currentUsersPage.map((e: any, index: number) => {
      return <li> {index} </li>
    })

    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(this.state.users.length / usersPerPage); i++) { pageNumber.push(i) }

    const renderPageNumber = pageNumber.map(number => {
      return (
        <li
          className='page-item'
          key={number}
          value={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    })
    const user = currentUsersPage.map((user: User, i: number) => {
      return (
        <div className='datos col-3 mb-2'>
          <div className="accordion" id="accordionExample">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                  <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapseOne" + i} aria-expanded="true" aria-controls="collapseOne">
                    <span className="text-truncate d-block w-100" style={{ maxWidth: '200px' }}>{user.name} {user.lastname}</span>
                  </button>
                </h2>
              </div>
              <div id={"collapseOne" + i} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div className="card-body">
                  <p>id>  <b> {user.id} </b> </p>
                  <p>Nombre.: <b>  {user.name} {user.middlename} {user.lastname}</b> </p>
                  <p>cedula.: <b> {user.document}</b></p>
                  <p>correo: <b> {user.email}</b> </p>
                  <div className='d-flex'>
                    <button className='btn btn-primary' onClick={() => this.edit(user)}  >editar</button>
                    <button className='btn btn-danger' type='button' onClick={() => this.deleteATasks(i)}>Eliminar Usuario</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })

    return (
      <div>
        <div className='loscard'>
          <div className='w-20 h-50'>
            <Formulario addANewUser={this.addANewUser} />
          </div>
          <div className='row'>
            {user}
          </div>
          <footer>
            <ul id='page-numbers' className='d-flex'>
              {renderPageNumber}
            </ul>
          </footer>
        </div>
      </div>
    );
  }
}

interface Iprops extends RouteComponentProps<any> {
}
interface IState {
  users: User[];
  currentPage: 1;
  usersPerPage: 4;

}
export default FormAndUser;
