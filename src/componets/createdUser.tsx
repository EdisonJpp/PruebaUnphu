import React from 'react';
import { User } from '../data/users';

class UsersCreados extends React.PureComponent<any, any>{
    constructor(props: Iprops) {
        super(props);
        const uusers = JSON.parse(localStorage.getItem('users') || '[]');
        this.state = {
            users: uusers,
            currentPage: 1,
            usersPerPage: 4
        };
    };
    handleClick = (e: any) => {
        this.setState({
            currentPage: e.target.value
        });
    };

    render() {
        const { users, currentPage, usersPerPage } = this.state;
        const indexOfLastUsers = currentPage * usersPerPage;
        const indexOfFirtUsers = indexOfLastUsers - usersPerPage;
        const currentUsersPage = users.slice(indexOfFirtUsers, indexOfLastUsers);
        const pageNumber = [];
        for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++)
         { pageNumber.push(i) }
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
        });
        const array = (a: User, b: User) => {
            const aa = a.name.toUpperCase();
            const bb = b.name.toUpperCase();
            let compare = 0;
            if (aa > bb) {
                compare = 1
            } else if (aa < bb) {
                compare = -1
            };
            return compare
        };
        const user = currentUsersPage.sort(array).map((user: User, i: number) => {
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
                                        <button className='btn btn-primary' onClick={() => this.props.edit(user) }  >editar</button>
                                        <button className='btn btn-danger' type='button' onClick={() => this.props.deleteATasks(i)}>Eliminar Usuario</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div className="users">
                <div className='row'>
                    {user}
                </div>
                <footer>
                    <ul id='page-numbers' className='d-flex'>
                        {renderPageNumber}
                    </ul>
                </footer>
            </div>
        );
    };
};
interface Iprops {
    edit: (user: User) => void,
    deleteATasks: (user: any) => void
};
interface state {
};
export default UsersCreados;

