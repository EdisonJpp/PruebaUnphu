import React from 'react';
import { User } from '../data/users';
import UsersCreados from './createdUser';
import { RouteComponentProps } from 'react-router-dom';
import SearchResult from './searchResult' ;

interface TasksListProps extends RouteComponentProps {
};
class Istate {
    users = [];
    currentPage = 1;
    usersPerPage = 8;
};

class UserList extends React.Component<TasksListProps, Istate, any>{
    constructor(props: TasksListProps) {
        super(props);
        const users = JSON.parse(localStorage.getItem('users')|| '[]');
        this.state = {
            users: users ,
            currentPage: 1,
            usersPerPage: 4
        };
    };
    deleteATasks = (index: number) => {
        if (window.confirm('are you sure?')) {
            let users =
                this.state.users.filter((user: number, i: number) => {
                    return i !== index
                });
            localStorage.setItem('users', JSON.stringify(users));
            this.setState({
                users
            });
        };
    };
    handleClick = (evento: any) => {
        this.setState({
            currentPage: Number(evento.target.value)
        });
    };
    edit = (element: User) => {
        const { document } = element;
        this.props.history.push('/formAndUser/' + document);
    };
    render() {
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
                <div className=''>
                <SearchResult edit={this.edit} deleteATasks={this.deleteATasks} />
                </div>
                    <UsersCreados edit={this.edit} deleteATasks={this.deleteATasks} />
            </div>
        );
    };
};
export default UserList;