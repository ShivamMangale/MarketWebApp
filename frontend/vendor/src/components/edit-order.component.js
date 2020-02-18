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
            products: [],
            productname: '',
            price: '',
            vendorid: '',
            customerid: '',
            status: '',
            product: []
        }
    }

    

    componentDidMount(){
        axios.get('http://localhost:5000/products/' + this.props.match.params.id)
        .then(response =>{
            console.log("the exact");
            this.setState({ product: response.data });
            // console.log(this.state.product);
        })
        .catch((error) =>{
            console.log(error);
        });
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


        
        // console.log(this.state.product);


        if(this.state.quantity > this.quantityleft){
            console.log("Quantity not possible. Please reduce the quantity appropriately.")
            this.setState({
                quantity: '',
                products: [],
                productname: '',
                price: '',
                vendorid: '',
                customerid: '',
                status: ''
            });
            return;
        }
        else{
        const order = {
            productid: this.props.match.params.id,
            productname: this.state.product.name,
            quantity: this.state.quantity,
            price: this.state.product.price,
            vendorid: this.state.product.vendorid,
            customerid: localStorage.getItem("id"),
            status: "waiting",
        }
        console.log("cak");
        console.log(this.state.product);
        if(this.state.quantity === this.state.quantityleft){
            order.status = "ready to dispatch";
            this.state.status = "ready to dispatch";
        }

        console.log(order);
        
        axios.post('http://localhost:5000/orders/update/' + this.props.match.params.orderid, order)
            .then(res => console.log(res.data))
            .catch((error) =>{
                console.log(error);
            });
        }

        // window.location = '/';
        this.setState({
            quantity: '',
            products: [],
            productname: '',
            price: '',
            vendorid: '',
            customerid: '',
            status: ''
        });
    }

    render(){
        return(
        <div>
            <h3>Edit Order</h3>
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
            <div className="form-group">
                <input type="submit" value="Order" className="btn btn-primary" />
            </div>
        </form>
      </div>
       
       )
    }
}