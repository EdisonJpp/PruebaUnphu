import React from 'react';
import {User} from '../data/users';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { userInfo } from 'os';
class Formulario extends React.Component<Form, any>{
    constructor(props : Form ){
        super(props);
        const Users = JSON.parse(localStorage.getItem('users')!);
        this.state = {
            users : Users ,
            id : Number,
            name: '',
            middlename: '',
            lastname: '',
            username: '',
            document: Number ,
            age: Number ,
            gender: '',
            address: '',
            phonenumber: Number ,
            email: '' ,
            maritalstatus: '',
            haveson: '',
            birthday: ''
        }
    }
    getID = ()=>{
        return new Date().getTime();
    }
    handleNewUser = () => {

        const user : User ={
            id : this.getID(),
            name: this.state.name ,
            middlename: this.state.middlename,
            lastname: this.state.lastname,
            username: this.state.username,
            document:this.state.document ,
            age: this.state.age,
            gender: this.state.gender,
            address: this.state.address,
            phonenumber: this.state.phonenumber,
            email:this.state.email ,
            maritalstatus: this.state.maritalstatus,
            haveson: this.state.haveson,
            birthday: this.state.birthday
        }

       this.props.addANewUser(user);
       this.setState({
        id : Number,
        name: '',
        middlename: '',
        lastname: '',
        username: '',
        document: Number ,
        age: Number ,
        gender: '',
        address: '',
        phonenumber: Number ,
        email: '' ,
        maritalstatus: '',
        haveson: '',
        birthday: ''
       });
        // console.log(user);
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {

         const { name, value  } = e.target;
         this.setState({
             [name] : value 
         })

        
    };
    validate = () =>{
        const documentValidate = this.state.document && this.state.document.length === 10 ;
        const allIsValid = (
            this.state.name &&
            this.state.lastname &&
            documentValidate 
        );
        return allIsValid ;
    }
    componentDidMount = () => {

        const document = this.props.match && this.props.match.params.document;
        const userData = JSON.parse(localStorage.getItem('users') || "[]");
        console.log(document);
        if(document) {
            const user = userData.find((user:any, i:number ) =>  user.document && user.document === document   );
            console.log(user);
            this.setState({
                 ...user
            })
        }
    }

    guardar = () => {
        if(window.confirm('quieres guardar lo editado?')){
        const { document } = this.props.match.params;
        let datos = JSON.parse(localStorage.getItem('users')!);
        const edition = datos.map((user: any, i:number  )=> user.document === document ? {...this.state} : user );
        localStorage.setItem('users', JSON.stringify(edition));
        this.Redirect()
        this.setState({
            users : edition
        })
        
      }
    }
    Redirect = () => this.props.history.push('/userList');
    render() {
        return (
            <div>
                    <div className="card m-2">
    
                        <div className='card-header'>
                            <h2 className='h1' >Crearr Usuario</h2>
                        </div>
                        <div className="card-body"  >
                            <div className="form-group">
                                <input
                                    onChange={this.handleChange}
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="nombre y segundo nombre"
                                    value={ this.state.name }
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    onChange={this.handleChange}
                                    type="texto"
                                    name="middlename"
                                    className="form-control"
                                    placeholder="primer apellido"
                                    value={ this.state.middlename }
    
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    onChange={this.handleChange}
                                    type="texto"
                                    name="lastname"
                                    className="form-control"
                                    placeholder=" segundo apellido"
                                    value={ this.state.lastname }
    
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    onChange={this.handleChange}
                                    type="texto"
                                    name="username"
                                    className="form-control"
                                    placeholder="Nombre de usuario"
                                    value={ this.state.username }
    
                                />
                            </div>
    
                            <div className="form-group">
                                <input
                                    onChange={this.handleChange}
                                    name="document"
                                    className="form-control"
                                    placeholder='cedula'
                                    value={ this.state.document }
    
    
                                />
    
    
                            </div>
                            <div className="form-group">
                                <input
                                    onChange={this.handleChange}
                                    type="number"
                                    name="age"
                                    className="form-control"
                                    placeholder=" edad"
                                    value={ this.state.age }
    
                                />
                            </div>
                            <div className="form-group">
                                <select
                                    name="gender"
                                    className="form-control"
                                    value={ this.state.gender }
    
                                >
                                    
                                    <option className="form-control">masculino</option>
                                    <option className="form-control" >femenino</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input
                                    onChange={this.handleChange}
                                    type="texto"
                                    name="address"
                                    className="form-control"
                                    placeholder="direccion de donde vives"
                                    value={ this.state.address }
    
                                />
                            </div>
                            <div className="form-group">
    
                                <input
                                    onChange={this.handleChange}
                                    placeholder="telefono"
                                    name="phonenumber"
                                    type='number'
                                    className="form-control"
                                    value={ this.state.phonenumber}
    
    
                                />
                            </div>
                            <div className="form-group">
    
                                <input
                                    onChange={this.handleChange}
                                    placeholder="corre electronico"
                                    name="email"
                                    type='text'
                                    className="form-control"
                                    value={ this.state.email }
    
    
                                />
                            </div>
                            <div className='form-group'>
                                <select
                                    name='maritalstatus'
                                    className="form-control"
                                    value={ this.state.maritalstatus }
    
                                >
                                    <option>Casad@</option>
                                    <option>solter@</option>
                                    <option>viudo@</option>
    
                                </select>
                            </div>
                            <div className="form-group">
    
                                <input
                                    onChange={this.handleChange}
                                    placeholder=" tienes hijos "
                                    name="haveson"
                                    type='text'
                                    className="form-control"
                                    value={ this.state.haveson }
    
                                />
                            </div>
                            <div className="form-group">
    
                                <input
                                    onChange={this.handleChange}
                                    placeholder="fecha de naciemiento"
                                    name="birthday"
                                    type='text'
                                    className="form-control"
                                    value={ this.state.birthday }
    
    
                                />
                            </div>
                         
                            <button
                            disabled={!this.validate()}
                            className="btn btn-warning"
                            onClick={this.props.match.params.document ? this.guardar : this.handleNewUser  }
                            >{this.props.match.params.document ? 'Editar Usuario' : 'Crear Usuario'}</button>
    
    
    
    
                        </div>
    
    
                    </div>
                </div>
        );
    }

}
interface formState{
    id : number;
    name:string ;
    middlename: string;
    lastname: string;
    username:string ;
    document:number ;
    age: 0 ;
    gender: string;
    address: string;
    phonenumber: 0;
    email:string ;
    maritalstatus: string;
    haveson: string;
    birthday: string;
}
interface Form extends RouteComponentProps<any>{
    addANewUser: (user : User ) => void ;
}
export default withRouter(Formulario); 