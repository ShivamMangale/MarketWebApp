import React,{Component} from 'react';
import axios from 'axios';

export default class CreateOrder extends Component{
    constructor(props){
        super(props);

        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        // this.onChangeEmail = this.onChangeEmail.bind(this);
        // this.onChangePassword = this.onChangePassword.bind(this);
        // this.onChangeType = this.onChangeType.bind(this);
        // this.onChangeProducts = this.onChangeProducts.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            quantity: '',
            // email: ' ',
            // password: '',
            // // products: '',
            // type: "customer",
            // usertypes: []
        }
    }

    

    componentDidMount(){
        // axios.get('http://localhost:5000/users')
        //     .then(response =>{
        //         if(response.data.length > 0){
        //             this.setState({
        //                 orders: response.data.map(order => order.username),
        //                 // orders.response.data.map(email => order.email),
        //                 ordername: response.data[0].username 
        //             })
        //         }
        //     })
        // this.setState({
        //     usertypes: ["order", "customer"]
        // });
    }
    
    onChangeQuantity(e){
        this.setState({
            quantity: e.target.value
        });
    }
    
    // onChangeEmail(e){
    //     this.setState({
    //         email: e.target.value
    //     });
    // }

    // onChangePassword(e){
    //     this.setState({
    //         password: e.target.value
    //     });
    // }

    // onChangeType(e){
    //     this.setState({
    //         type: e.target.value
    //     });
    // }

    // onChangeProducts(e){
    //     this.setState({
    //         products: e.target.value
    //     });
    // }

    onSubmit(e){
        e.preventDefault();

        const order = {
            // username: this.state.username,
            // email: this.state.email,
            // password: this.state.password,
            // products: this.state.products
            productid: this.props.match.params.id,
            productname: "replace later",
            quantity: this.state.quantity,
            price: 100,
            vendorid: this.props.match.params.id,
            customerid: this.props.match.params.id,
            status: "waiting",
        }

        console.log(order);
        
        axios.post('http://localhost:5000/orders/add', order)
            .then(res => console.log(res.data));


        window.location = '/';
        this.setState({
            quantity: '',
        });
    }

    render(){
        return(
        <div>
            <h3>Create New Order</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
                <label>Quantity: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.quantity}
                    onChange={this.onChangeQuantity}
                    />
            </div>
            {/* <div className="form-group"> 
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
            </div> */}
            {/* <div className="form-group"> 
                <label>Products: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.products}
                    onChange={this.onChangeProducts}
                    />
            </div> */}
            {/* <div className="form-group"> 
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
            </div> */}
            {/* <div className="form-group">
                <form>
                    <input type="radio" id="order" name="gender" value="order"></input>
                    <label for="order">Order</label><br></br>
                    <input type="radio" id="customer" name="gender" value="customer"></input>
                    <label for="customer">Customer</label>
                </form> 
            </div> */}
            <div className="form-group">
                <input type="submit" value="Order" className="btn btn-primary" />
            </div>
        </form>
      </div>
       
       )
    }
}