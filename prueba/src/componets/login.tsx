import React from 'react';
// import { Redirect,  RouteComponentProps } from "react-router-dom";
// import { User } from '../data/user';


export class State {
    username: string = 'Epadilla';
    password: string = 'padilla20';
  }

//   export class loginState { 
//       userData : State = new State
//   }



class Login extends React.PureComponent<any , any >{
    // constructor(props : Iprops){
    //     super(props);
    //     this.state={
    //         username : '',
    //         password : ''

    //     }
    // }


    // state ={ username : '' , password: '' } as Iuser;

    handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const { name , value } = e.target;
        // const state = this.state ;
        // const valore = name.concat(value); 
                // { [name] = value ;}
                this.setState({
                    // ...this.state.userData,
                    // this.state: {
                        ...this.state,
                        [name]: value,
                    
                    });

                    console.log(this.state);
                  
            //     this.setState({
            //      [name] : value
            //  })
         console.log(value);
    }
    handleSubmit = () => {
        const userData = new State ;
        const user = {
            username : this.state.username,
            password : this.state.password
        }
                      
        if( userData.username === user.username && userData.password === user.password){
            localStorage.setItem('userData', JSON.stringify(user));
            return this.Redirect();
        }else console.log('no redirect');

        
    }
    componentDidMount = () =>{
        const userData = new State ;
        const user = 
        JSON.parse(localStorage.getItem("userData")!); 



        if( user){
            userData.username === user.username && userData.password === user.password ? this.Redirect() : console.log('no redirect2');
        }else return this.Redirect2()
    }
    


    
      
    Redirect = () => this.props.history.push('/formAndUser');
    Redirect2 = () => this.props.history.push('/login');
    

  

    render(){
        return(
            <div className='loginn'>
             {/* <img src={Edicion2} className='perfil' alt='edison' /> */}
                <div className='card-deck bg-light'>
                    <h1 className='h1' style={{ "color": "#333" }} >Login</h1>
                    <div className='card-body'>

                        {/* <form className='' > */}
                            <div className='form-group' >
                                <i className="fas fa-user mr-2"></i>
                                <label>Usuario</label>
                                <input
                                    className="form-control"
                                    name='username'
                                    type='text'
                                    // value={this.state.userData.username}
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
                                    // value={this.state.userData.password}
                                    onChange={this.handleChange}
                                    placeholder='Password'
                                />
                            </div>
                            <button className='btn btn-primary' onClick={this.handleSubmit}> Entrar</button>

                        {/* </form> */}

                    </div>
                </div>
                {/* <img src={Edicion3} className='perfil' alt='edison' /> */}
            </div>
        );
    }
}
// interface Iprops extends RouteComponentProps<any> {
//     redirect?: boolean;
// }
// interface Iuser {
//     // user : User[] ;
//     username: string; 
//     password: string ;  
// }



export default Login ;