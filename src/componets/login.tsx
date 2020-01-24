import React from 'react';

export class State {
    username: string = 'Epadilla';
    password: string = 'padilla20';
}

class Login extends React.PureComponent<any, any>{

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            [name]: value,
        });
    }

    handleSubmit = () => {
        const userData = new State;
        const user = {
            username: this.state.username,
            password: this.state.password
        }

        if (userData.username === user.username && userData.password === user.password) {
            localStorage.setItem('userData', JSON.stringify(user));
            return this.Redirect();
        } else return null


    }
    componentDidMount = () => {
        const userData = new State;
        const user =
            JSON.parse(localStorage.getItem("userData")!);
        if (user) {
            userData.username === user.username && userData.password === user.password ? this.Redirect() : console.log('no redirect2');
        } else return this.Redirect2()
    }

    Redirect = () => this.props.history.push('/formAndUser');
    Redirect2 = () => this.props.history.push('/login');

    render() {
        return (
            <div className='loginn'>
                <div className='card-deck bg-light'>
                    <h1 className='h1' style={{ "color": "#333" }} >Login</h1>
                    <div className='card-body'>
                        <div className='form-group' >
                            <i className="fas fa-user mr-2"></i>
                            <label>Usuario</label>
                            <input
                                className="form-control"
                                name='username'
                                type='text'
                                onChange={this.handleChange}
                                placeholder='Ingrese Usuario'
                            />
                        </div>
                        <div className='form-group' >
                            <i className="fas fa-unlock-alt mr-2 "></i>
                            <label className="">Password</label>
                            <input
                                name='password'
                                className="form-control"
                                type='password'
                                onChange={this.handleChange}
                                placeholder='Password'
                            />
                        </div>
                        <button className='btn btn-primary' onClick={this.handleSubmit}> Entrar</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;