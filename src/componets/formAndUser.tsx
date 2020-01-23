import React from 'react';
import Formulario from './formulario';
import { User } from '../data/users';
import UserList from './UserList';
import { RouteComponentProps, withRouter } from 'react-router-dom';


class FormAndUser extends React.Component<Iprops, IState>{

  constructor(props: Iprops) {
    super(props);
    // const users = JSON.parse(localStorage.getItem('users')!);

    this.state = {
      // uusers : uusers ,
      users: [],
      currentPage: 1,
      usersPerPage: 4
    }
  }
  //  state = { user : [] } as IState ;
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
    // const users = this.state.users ; 
    // localStorage.setItem('users' , JSON.stringify(this.state.users));

  }





  redirect2 = () => this.props.history.push('/userList');
  redirect = () => this.props.history.push('/login');

  // logout = () =>{
  //   if(window.confirm('do you want to leave the account?')){
  //     localStorage.removeItem('userData');
  //     return this.redirect();
  //   }else console.log('you dindnt go out');
  // }

  edit = (element: any) => {

    const { document } = element;
    this.props.history.push('/formAndUser/' + document);

    // console.log('klk');

  }
  handleClick = (evento: any) => {
    this.setState({
      // ...this.state.currentPage,
      currentPage: (evento.target.value)
    });

  }
  deleteATasks = (element: any) =>{
    const users = JSON.parse(localStorage.getItem('users')!);

    if(window.confirm('are you sure, do you want to delete this user')){
      let uuser =
      users.filter((user:string, i:number ) =>{
        return  i !== element 
      });
      localStorage.setItem('users' , JSON.stringify(uuser));
          this.setState({
            users : uuser

          });
    }
  }

  render() {
    const uusers = JSON.parse(localStorage.getItem('users')!);
    const { currentPage, usersPerPage } = this.state;

    //logic for displaying users

    const indexOfLastUsers = currentPage * usersPerPage;
    const indexOfFirtUsers = indexOfLastUsers - usersPerPage;
    const currentUsersPage = uusers.slice(indexOfFirtUsers, indexOfLastUsers);

    const renderCurrentUsersPage = currentUsersPage.map((e: any, index: number) => {
      return <li> {index} </li>

    })
    console.log(renderCurrentUsersPage);

    // logic for displaying page numbers
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(uusers.length / usersPerPage); i++) { pageNumber.push(i) }


    const renderPageNumber = pageNumber.map(number => {
      return (

        <li
          className='page-item'
          key={number}
          // id={number}
          value={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    })
    // const Form = withRouter(Formulario);
    // const Users = JSON.parse(localStorage.getItem('users')!);
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
                  {/* <p>ID {this.getID()}</p> */}
                  <p>id>  <b> {user.id} </b> </p>
                  <p>Nombre.: <b>  {user.name} {user.middlename} {user.lastname}</b> </p>
                  {/* <p>nombre de usuario.:<b> {user.nombreUsuario}</b></p> */}
                  <p>cedula.: <b> {user.document}</b></p>
                  <p>correo: <b> {user.email}</b> </p>
                  <div className='d-flex'>
                    <button className='btn btn-primary' onClick={() => this.edit(user)}  >editar</button>
                    <button className='btn btn-danger' type='button' onClick={() =>this.deleteATasks(i)}>Eliminar Usuario</button>
                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>

      );

    })

    //  const users = JSON.parse(localStorage.getItem('users')!);
    // const Form = withRouter(Formulario);
    return (
      //   <div>
      //     <nav className='navbar navbar-light bg-light'>
      //       {/* <a className='navbar-brand' href='/' > {this.props.title} </a> */}
      //     </nav>
      //     <div className='container p-4 ' >
      //       <div className='row' >
      //         <div className='col-md-4' >

      //           <Form
      //           addANewUser={this.addANewUser}
      //           />
      //         </div>
      //           <div className='col-md-8' >
      //             <div className='row' >
      //               <UserList  users={this.state.users} edit={this.edit} />
      //             </div>
      //           </div>
      //       </div>
      //     </div>
      //   </div>
      <div>
        {/* {this.renderRedirect()} */}






        <div className='loscard'>
          <div className='w-20 h-50'>

            <Formulario addANewUser={this.addANewUser} />

          </div>

          <div className='row'>

            {/* <UserList  users={this.state.users} edit={this.edit} /> */}
            {user }

            {       /*             <Activos 
        edit={this.edit()}
        removeTodo={this.removeTodo}
        />
</div> */}
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
  // edit : (element : any ) => void
  // users: User[];

  // title: string;
}
interface IState {
  users: User[];
  currentPage: 1;
  usersPerPage: 4;

}
export default FormAndUser;
