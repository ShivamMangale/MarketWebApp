import React,{Component} from 'react';
import axios from 'axios';



export default class CreateProduct extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeVendorId = this.onChangeVendorId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            name: '',
            price: '',
            quantity: '',
            vendorid: '',
            status: ''
        }
    }

    componentDidMount(){
        // this.setState({
        //     usertypes: ["vendor", "customer"]
        // });
    }
    
    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }
    
    onChangePrice(e){
        this.setState({
            price: e.target.value
        });
    }

    onChangeQuantity(e){
        this.setState({
            quantity: e.target.value
        });
    }

    onChangeVendorId(e){
        this.setState({
            vendorid: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const product = {
            name: this.state.name,
            price: this.state.price,
            quantity: this.state.quantity,
            vendorid: localStorage.getItem("id"),
            status: "waiting",
        }

        console.log(product);
        if(product.quantity === "0"){
            alert("Quantity cant be zero.");
            console.log("Quantity is zero.")
        }
        else{
        axios.post('http://localhost:5000/products/add', product)
            .then(res => {
                console.log(res.data);
                alert("Product Created Successfully.")})
            .catch(err => alert(err + " Please check fields and try again"));
        this.setState({
            name: '',
            price: '',
            quantity: '',
            vendorid: '',
        });
        }
    }

    render(){
        return(
        <div>
            <h3>Create New Product</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
                <label>Name: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    />
            </div>
            <div className="form-group"> 
                <label>Price: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.price}
                    onChange={this.onChangePrice}
                    />
            </div>
            <div className="form-group"> 
                <label>Quantity: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.quantity}
                    onChange={this.onChangeQuantity}
                    />
            </div>
            {/* <div>
                <label for="img">Select image:</label>
                <input type="file" id="img" name="img" value = accept="image/*"/>
            </div> */}
                <div className="form-group">
                <input type="submit" value="Create Product Listing" className="btn btn-primary" />
            </div>
        </form>
      </div>
       
       )
    }
}