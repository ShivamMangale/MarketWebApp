import React,{Component} from 'react';
import axios from 'axios';



export default class CreateProduct extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeVendorId = this.onChangeVendorId.bind(this);
        // this.onChangeType = this.onChangeType.bind(this);
        // this.onChangeProducts = this.onChangeProducts.bind(this);
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

    // onChangeProducts(e){
    //     this.setState({
    //         products: e.target.value
    //     });
    // }

    onSubmit(e){
        e.preventDefault();

        const product = {
            name: this.state.name,
            price: this.state.price,
            quantity: this.state.quantity,
            vendorid: this.state.vendorid,
            status: "Waiting",
            // products: this.state.products
        }

        console.log(product);
        axios.post('http://localhost:5000/products/add', product)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error: ' + err));
        // window.location = '/';
        this.setState({
            name: '',
            price: '',
            quantity: '',
            vendorid: '',
            // products: ''
        });
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
            <div className="form-group"> 
                <label>VendorId: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.vendorid}
                    onChange={this.onChangeVendorId}
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
                    <input type="radio" id="product" name="gender" value="product"></input>
                    <label for="product">Product</label><br></br>
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