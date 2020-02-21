import React,{Component} from 'react';
import axios from 'axios';

export default class CreateVendor extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        // this.onChangeProducts = this.onChangeProducts.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            username: '',
            password: '',
            // products: '',
            type: "customer",
            usertypes: []
        }
    }

    componentDidMount(){
        this.setState({
            usertypes: ["vendor", "customer"]
        });
    }
    
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    
    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onChangeType(e){
        this.setState({
            type: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
            // products: this.state.products
        }
        
        console.log(user);
        if(this.state.type === "vendor"){
            axios.post('http://localhost:5000/vendors/add', user)
            .then(res => {
                console.log(res.data);
                alert("Successful. Head over to the signin page.")
            })
            .catch(error => {
                console.log(error);
                alert("Use another username.");
            });
        }
        else{
            axios.post('http://localhost:5000/customers/add', user)
            .then(res => {
                console.log(res.data);
                alert("Successful. Head over to the SignIn page.")})
            .catch(error => {
                console.log(error);
                alert("Use another username.");
            });
        }
        this.setState({
            username: '',
            password: '',
            // products: ''
            type: "customer"
        });
    }

    render(){
        return(
        <div>
            <h3 style={{color:"blue", }}>Sign Up</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
                <label>Username: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    />
            </div>
            <div className="form-group"> 
                <label>Password: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    />
            </div>
            <div className="form-group"> 
                <label>Usernames: </label>
                    <select ref="userInput"
                        required
                        className="form-control"
                        value={this.state.type}
                        onChange={this.onChangeType}>
                        {
                            this.state.usertypes.map(function(choice) {
                            return <option 
                                key={choice}
                                value={choice}>{choice}
                                </option>;
                            })
                        }
                    </select>
            </div>
            <div className="form-group">
                <input type="submit" value="Sign Up" className="btn btn-primary" />
            </div>
        </form>
      </div>
       
       )
    }
}