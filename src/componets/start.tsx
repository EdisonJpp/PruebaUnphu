import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class start extends React.Component<any, any> {
    constructor(props: string) {
        super(props);
        this.state = {
            Redirect: false,
            sideBarIsHidden: false,
        };
    };
    setRedirect = () => {
        this.setState({
            Redirect: true
        });
    };
    renderRedirect = () => {
        if (this.state.Redirect === true) {
            return <Redirect to='/login' />
        } else return null;
    };
    logout = () => {
        if (window.confirm('do you want to leave the account?')) {
            localStorage.removeItem('userData');
            return this.setRedirect();
        } else return null;
    };

    toggleSideBar = () => this.setState({ ...this.state, sideBarIsHidden: !this.state.sideBarIsHidden });


    render() {
        return (
            <div className='body'>
                {this.renderRedirect()}
                <div className={`header ${this.state.sideBarIsHidden && 'hide-sidebar'}`}>
                    <div className="collapse navbar-collapse show" id="navbarNavAltMarkup">
                        <div className="topeusua">
                            <ul>
                                <li className="nameusua">EDISON PADILLA</li>
                                <li>Edisojp@gmail.com</li>
                            </ul>
                        </div>
                        <ul className="nav flex-columns navizquierdo">
                            <li className="nav-item">
                                <span><Link to='/formAndUser'>
                                    <span className="nav-link active"><i className="fas fa-user"></i>
                                        Agregar Usuario
                                </span>
                                </Link>
                                </span>
                            </li>
                            <div className="dropdown-divider"></div>
                            <li className="nav-item">
                                <Link to='/userList'> <span className="nav-link"><i className="fas fa-users"></i>Usuarios Activos </span></Link>
                            </li>
                            <div className="dropdown-divider"></div>
                            <li className="nav-item"  >
                                <span className="nav-link" onClick={() => this.logout()} ><i className="fas fa-sign-out-alt"></i> Cerrar Session</span>
                            </li>
                            <div className="dropdown-divider"></div>
                        </ul>
                    </div>
                </div>
                <div className='partederecha d-flex' style={{flexDirection :'column'}}>
                    <div className='topderecho'>
                        <nav className="navbar navbar-expand-lg  topederecho">
                            <span ><i className="fas fa-user-check"></i>Registro de usuario</span>
                            <span className="navbar-toggler-icon"></span>
                            <div className="collapse navbar-collapse tope" id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                   <Link to='/userList'> <span className="nav-item nav-link active"> <i className="fas fa-search"></i>Buscar </span> </Link>
                                    <Link to='/inicio'> <span className="nav-item nav-link" >Inicio<i className="fas fa-home"></i></span></Link>
                                </div>
                            </div>
                        </nav>
                    </div>
                <button className="btn-primary" onClick={this.toggleSideBar}>Sidebar</button>
                    {this.props.children}
                </div>
                </div>
                );
            };
        };
export default start;