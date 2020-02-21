import React,{Component} from 'react';
import axios from 'axios';
var sha1 = require('sha1');

export default class CreateVendor extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        // this.onChangeProducts = this.onChangeProducts.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            username: '',
            password: '',
            // products: '',
            type: '',
            vendors: [],
            customers: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/vendors')
            .then(response =>{
                if(response.data.length > 0){
                    this.setState({
                        vendors: response.data})
                }
            })
        axios.get('http://localhost:5000/customers')
            .then(response =>{
                if(response.data.length > 0){
                    this.setState({
                        customers: response.data,})
                }
            })
        this.setState({
            type: "customer"
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

    onSubmit(e){
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
            // products: this.state.products,
            type: ''
        }

        let flag = 0;
        let id = 0;

        this.state.vendors.map(currentvendor => {
            //   console.log(currentvendor);
            if(currentvendor.username === this.state.username){
                if(currentvendor.password === this.state.password){
                    this.setState({type: "vendor"});
                    console.log("found");
                    console.log(this.state.type,"===the type");
                    id = currentvendor._id;
                    flag = 1;
                }
                else{
                    console.log("Wrong Password");
                    alert("Wrong Password");
                }
            }
        })
        this.state.customers.map(currentcustomer => {
            //   console.log(currentcustomer);
            if(currentcustomer.username === this.state.username){
                if(currentcustomer.password === this.state.password){
                    this.setState({type: "customer"});
                    id = currentcustomer._id;
                    flag = 2;
                }
                else{
                    console.log("Wrong Password");
                    alert("Wrong Password");
                }
            }
        })

        console.log(user);
        console.log(flag,"flag");
        

        if(flag !== 0){
            console.log(this.state.type);
            localStorage.setItem("signin", "1");
            localStorage.setItem("id", id);
            console.log(localStorage.getItem("signin"));
    
        if(flag === 1){
            console.log("Vendor signed in");
            alert("Signed in.Please Reload.");
            localStorage.setItem("usertype", "vendor");
        }
        else{
            console.log("Customer signed in");
            alert("Signed in.Please Reload.");
            localStorage.setItem("usertype", "customer");
        }
        }
        else{
            console.log("couldnt signin");
        }
        this.setState({
            username: '',
            password: '',
        });
    }

    render(){
        return(
        <div>
            <h3>Sign In</h3>
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
                <input type="submit" value="Sign In" className="btn btn-primary" />
            </div>
        </form>
      </div>
       
       )
    }
}