import React,{Component} from 'react';
import axios from 'axios';

export default class CreateVendor extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        // this.onChangeProducts = this.onChangeProducts.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            username: '',
            email: '',
            password: '',
            // products: '',
            type: "customer",
            usertypes: []
        }
    }

    componentDidMount(){
        // axios.get('http://localhost:5000/users')
        //     .then(response =>{
        //         if(response.data.length > 0){
        //             this.setState({
        //                 vendors: response.data.map(vendor => vendor.username),
        //                 // vendors.response.data.map(email => vendor.email),
        //                 vendorname: response.data[0].username 
        //             })
        //         }
        //     })
        this.setState({
            usertypes: ["vendor", "customer"]
        });
    }
    
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    
    onChangeEmail(e){
        this.setState({
            email: e.target.value
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

    // onChangeProducts(e){
    //     this.setState({
    //         products: e.target.value
    //     });
    // }

    onSubmit(e){
        e.preventDefault();

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            // products: this.state.products
        }

        console.log(user);
        if(this.state.type === "vendor"){
            axios.post('http://localhost:5000/vendors/add', user)
            .then(res => console.log(res.data));
        }
        else{
            axios.post('http://localhost:5000/customers/add', user)
            .then(res => console.log(res.data));
        }

        this.setState({
            username: '',
            email: '',
            password: '',
            // products: ''
            type: "customer"
        });
    }

    render(){
        return(
        <div>
            <h3>Sign Up</h3>
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
                <label>Email: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
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
            {/* <div className="form-group"> 
                <label>Products: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.products}
                    onChange={this.onChangeProducts}
                    />
            </div> */}
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
            {/* <div className="form-group">
                <form>
                    <input type="radio" id="vendor" name="gender" value="vendor"></input>
                    <label for="vendor">Vendor</label><br></br>
                    <input type="radio" id="customer" name="gender" value="customer"></input>
                    <label for="customer">Customer</label>
                </form> 
            </div> */}
            <div className="form-group">
                <input type="submit" value="Create User" className="btn btn-primary" />
            </div>
        </form>
      </div>
       
       )
    }
}