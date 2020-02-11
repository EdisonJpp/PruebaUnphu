import React, { ChangeEvent } from 'react';
import { User } from '../data/users';

class Istate {

    users = [];
    currentPage = 1;
    usersPerPage = 8;
    search = ''
    userFilter = [];
}

class UserList extends React.Component<TasksListProps, Istate, any>{
    constructor(props: TasksListProps) {
        super(props);
        const users = JSON.parse(localStorage.getItem('users')!);
        this.state = {
            users: users,
            currentPage: 1,
            usersPerPage: 4,
            userFilter: [],
            search: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    deleteATasks = (index: number) => {
        if (window.confirm('are you sure?')) {
            let users =
                this.state.users.filter((user: number, i: number) => {
                    return i !== index
                })
            localStorage.setItem('users', JSON.stringify(users));
            this.setState({
                users
            })
        }
    }

    handleClick = (evento: any) => {
        this.setState({
            currentPage: Number(evento.target.value)
        });

    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            [name]: value
        })
    }


    handleSubmit() {
        const search = this.state.search;

        const encontrar = this.state.users.filter(users => JSON.stringify(users).toLocaleLowerCase().includes(search.toLocaleLowerCase()));
        this.setState({
            userFilter: encontrar
        })
    }



    edition = (element: any) => {
        this.props.edit(element);

    }

    render() {
        const { users, currentPage, usersPerPage } = this.state;

        const indexOfLastUsers = currentPage * usersPerPage;
        const indexOfFirtUsers = indexOfLastUsers - usersPerPage;
        const currentUsersPage = users.slice(indexOfFirtUsers, indexOfLastUsers);

        const renderCurrentUsersPage = currentUsersPage.map((e: Number, index: number) => {
            return <li> {index} </li>

        })

        const pageNumber = [];
        for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) { pageNumber.push(i) }


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
        const Usuarios = ( a:User , b:User) =>{
            let fornameA = a.name.toUpperCase();
            let fornameB = b.name.toUpperCase();
             
            let compare = 0
            if( fornameA > fornameB){
                compare = 1
            }else if(fornameA < fornameB){
                compare = -1
            }
            return  compare 
        };

        const user = currentUsersPage.sort(Usuarios).map((user: User, i: number) => {
            return (
          
                                    <div className='datos col-3 mb-2 d-flex'>
                            
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
                                                <button className='btn btn-danger' type='button' onClick={() => this.deleteATasks(i)}>Eliminar Usuario</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        
        
        
                            </div>
                        </div>

            );
        })

        

        const usersfilter = this.state.userFilter.map((userss:User , i:number  ) =>{
            return( 

                <div className='datos col-3 mb-2 d-flex'>

                <div className="accordion" id="accordionExample">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h2 className="mb-0">
                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapseOne" + userss.id} aria-expanded="true" aria-controls="collapseOne">
                                    <span className="text-truncate d-block w-100" style={{ maxWidth: '200px' }}>{userss.name} {userss.lastname}</span>
                                </button>
                            </h2>
                        </div>

                        <div id={"collapseOne" + userss.id} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body">
                                <p>id>  <b> {userss.id} </b> </p>
                                <p>Nombre.: <b>  {userss.name} {userss.middlename} {userss.lastname}</b> </p>
                                <p>cedula.: <b> {userss.document}</b></p>
                                <p>correo: <b> {userss.email}</b> </p>
                                <div className='d-flex'>
                                    <button className='btn btn-primary' onClick={() => this.edition(userss)}  >editar</button>
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
                        <button className='btn btn-primary' onClick={this.handleSubmit}>buscar</button>
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
                <h2>
                    Resultados <span className='badge badge-pill badge-danger ml-2'>{this.state.userFilter.length}</span>
                </h2>
                    {usersfilter}

            </div>
        );
    }
}
interface TasksListProps {
    users: User[];
    edit: (element: any) => void
}
export default UserList;