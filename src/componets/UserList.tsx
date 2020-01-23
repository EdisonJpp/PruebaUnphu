import React, { ChangeEvent } from 'react';
import { User } from '../data/users';

class Istate {

    users = [];
    currentPage = 1;
    usersPerPage = 8;
    search = 'buscar'
}

class UserList extends React.Component<TasksListProps, Istate, any >{
    constructor(props: TasksListProps) {
        super(props);
        const users = JSON.parse(localStorage.getItem('users')!);
        this.state = {
            users: users,
            currentPage: 1,
            usersPerPage: 4,
            search : ''


        }
    }

    deleteATasks = (index: number) => {
        // let users = JSON.parse(localStorage.getItem('users')!)

        if (window.confirm('are you sure?')) {
            let users =
                this.state.users.filter((user: number, i) => {
                    return i !== index
                })
            localStorage.setItem('users', JSON.stringify(users));

            this.setState({
                users
            })

            console.log('aqui');


        }
    }


    // state = { users:this.props.users ,  currentPage: 1  , usersPerPage : 4   } as Istate ;

    handleClick = (evento: any) => {
        this.setState({
            currentPage: Number(evento.target.value)
        });

    }
    handleChange(event: React.ChangeEvent<HTMLInputElement>) {

        const { name, value } = event.target;
        // const valuee = value ;
        this.setState({
            ...this.state,
            [name]: value,
            // search : value
    
        });
        console.log(value);
    }
    handleSubmit(index : any){
        const search = this.state.search || '';
        console.log(search)
        const encontrar = this.state.users.filter((user, i) => { 
            return JSON.stringify(user).toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
            // return user === buscar
        })
        this.setState({
            users : encontrar
        })

        console.log(encontrar);
    }

    edition = (element : any)=>{
        console.log(this.props.edit)
        this.props.edit(element);
    }










    render() {


        // const userList = JSON.parse(localStorage.getItem('users') || '{}');

        const { users, currentPage, usersPerPage } = this.state;

        //logic for displaying users

        const indexOfLastUsers = currentPage * usersPerPage;
        const indexOfFirtUsers = indexOfLastUsers - usersPerPage;
        const currentUsersPage = users.slice(indexOfFirtUsers, indexOfLastUsers);

        const renderCurrentUsersPage = currentUsersPage.map((e: Number, index: number) => {
            return <li> {index} </li>

        })
        console.log(renderCurrentUsersPage);

        // logic for displaying page numbers
        const pageNumber = [];
        for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) { pageNumber.push(i) }


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


        


        // console.log(renderPageNumber);

        // const tasks = this.props.users ;
        // const tasks = JSON.parse(localStorage.getItem('users') || '{}');
        // console.log(this.state.users);

        const user = currentUsersPage.map((user: User, i: number) => {
            return (
                <div className='datos col-3 mb-2'>

                    <div className="accordion" id="accordionExample">
                        <div className="card">
                            <div className="card-header" id="headingOne">
                                <h2 className="mb-0">
                                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapseOne" + i} aria-expanded="true" aria-controls="collapseOne">
                                     <span className="text-truncate d-block w-100" style={{maxWidth: '200px'}}>{user.name} {user.lastname}</span>
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
                                   <button className='btn btn-primary' onClick={ () => this.edition(user)}  >editar</button>
                                    <button className='btn btn-danger' type='button' onClick={() =>this.deleteATasks(i)}>Eliminar Usuario</button>
                                   </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>

            );
        })
        return (
            <div className='userss'>
                <nav className="breadcrumb-container" aria-label="breadcrumb">
                    <ol className="breadcrumb migaja ">

                        <li>
                            <h4>
                                Usuarios Activos <span className='badge badge-pill badge-danger ml-2'>{this.state.users.length}</span>

                            </h4>
                        </li>

                    </ol>
                </nav>
                <div className='topeactivo'>
                    <div className='' >

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Buscar Usuario'
                            name='search'
                            value={this.state.search}
                            onChange={this.handleChange}
                        />
                        <button className='btn btn-primary' onClick={ ()=> this.handleSubmit}>buscar</button>
                    </div>

                </div>
                <div className='row'>


                    {user}
                </div>
                <footer>
                    <ul >
                        {renderPageNumber}
                    </ul>
                </footer>

            </div>
        );
    }
}
interface TasksListProps{
     users: User[];
   edit : (element : any ) => void

    // deleteATask: (index: number) => void;
    // handleClick : (e: number) => void ;

}
// interface Istate { 
//     users:  User[];
//     currentPage:  1;
//     usersPerPage: 4;


// }
export default UserList;