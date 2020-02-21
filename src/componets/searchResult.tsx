import React from 'react';
import { User } from '../data/users';

class SearchResult extends React.Component<TasksListProps, any>{
    constructor(props: TasksListProps) {
        super(props);
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        this.state = {
            users: users,
            userFilter: [],
            search: ''
        };
    };
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            [name]: value
        });
        const encontrar = this.state.users.filter((user: any, i: Number) => JSON.stringify(user).toLocaleLowerCase().includes(value.toLocaleLowerCase()));
        this.setState({
            userFilter: encontrar
        });
        if(value === ''){
            this.setState({
                userFilter : []
            });
        };
    };

    render() {
        const usersfilter = this.state.userFilter.map((userss: User, i: number) => {
            return (
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
                                        <button className='btn btn-primary' onClick={() => this.props.edit(userss)}  >editar</button>
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
            <div className="rey">
                <div className='form-group result' >
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Buscar Usuario'
                        name='search'
                        value={this.state.search}
                        onChange={this.handleChange}
                    />
                    <button className='btn btn-primary'>buscar</button>
                </div>
                <div className="searchResult">
                    {usersfilter}
                </div>
            </div>
        );
    };
};
interface TasksListProps {
    edit: (user: User) => void,
    deleteATasks: (user: any) => void
};
export default SearchResult; 