import React,{Component} from 'react';
import axios from 'axios';

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  

export default class CreateOrder extends Component{
    constructor(props){
        super(props);

        this.onChangeQuantity = this.onChangeQuantity.bind(this);
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
        })
        .catch((error) =>{
            console.log(error);
        });
        this.setState({
            usertypes: ["order", "customer"]
        });
    }
    
    onChangeQuantity(e){
        this.setState({
            quantity: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();


        
        // console.log(this.state.product);
        axios.get('http://localhost:5000/products/getquantityleft/' + this.props.match.params.id)
        .then(response =>{
            console.log(response.data);
            this.setState({ quantityleft: response.data });
            // console.log(this.state.product);
            
        if(this.state.quantity > this.state.quantityleft){
            alert("Quantity not possible. Please reduce the quantity appropriately.")
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
        console.log(this.state.product);
        if(this.state.quantity === this.state.quantityleft){
            order.status = "ready to dispatch";
            this.state.status = "ready to dispatch";
        }

        console.log(order);
        axios.post('http://localhost:5000/products/quantity/' + this.props.match.params.id + '/' + Number(this.state.quantityleft - order.quantity))
            .then(res => console.log(res))
            .catch(err => console.log(err));
        axios.post('http://localhost:5000/orders/add', order)
            .then(res => console.log(res.data));
        console.log("Now");
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
        alert("Order Created");
        })
        .catch((error) =>{
            console.log(error);
        });
        // sleep(500);
     
    }

    render(){
        return(
        <div>
            <h3>Create New Order</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group" > 
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