import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

var searched = "kpandvpnea";

const Product = props => (
    <tr>
      <td>{props.product.name}</td>
      <td>{props.product.price}</td>
      <td>{props.product.quantity}</td>
      <td>{props.product.status}</td>
      <td>{props.product.vendorid}</td>
      <td>{props.product.buyers}</td>
      <td>
        <Link to={"/orders/add/"+props.product._id}>Place Order</Link>
      </td>
    </tr>
  )

export default class ProductList extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.deleteproduct = this.deleteProduct.bind(this);

        this.state = {name : '',product: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/products')
            .then(response =>{
                console.log("Entered");
                this.setState({ product: response.data });
                console.log(this.state.product);
            })
            .catch((error) =>{
                console.log(error);
            })
    }

    deleteProduct(id) {
        axios.delete('http://localhost:5000/products/'+id)
          .then(response => { console.log(response.data)});

        this.setState({
          product: this.state.product.filter(el => el._id !== id)
        })
      }

      productList() {
        return this.state.product.map(currentproduct => {
        //   console.log(currentproduct.name);
        if(currentproduct.name !== this.state.name){
            // console.log(this.state.search);
            return null;
        }
        else{
          return <Product product={currentproduct} deleteProduct={this.deleteProduct} key={currentproduct._id}/>;
        }
        })
      }

      onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }

    // onSubmit(e){
    //     e.preventDefault();
    //     console.log("submitted");
    //     // const user = {
    //     //     username: this.state.username,
    //     //     email: this.state.email,
    //     //     password: this.state.password,
    //     //     // products: this.state.products
    //     // }

    //     // console.log(user);
    //     // if(this.state.type === "vendor"){
    //     //     axios.post('http://localhost:5000/vendors/add', user)
    //     //     .then(res => console.log(res.data));
    //     // }
    //     // else{
    //     //     axios.post('http://localhost:5000/customers/add', user)
    //     //     .then(res => console.log(res.data));
    //     // }

    //     // // window.location = '/';
    //     // this.setState({
    //     //     username: '',
    //     //     email: '',
    //     //     password: '',
    //     //     // products: ''
    //     //     type: "customer"
    //     // });
    //     this.setState({
    //         search: this.state.name,
    //     });
    // }

    render(){
        return(
            <div>
            <div>
            <h3>Search by Product Name</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
                <label>Search by Product Name: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    />
            </div>
            </form>
            </div>
            <div className="form-group">
                <input type="submit" value="Search Product" className="btn btn-primary" />
            </div>
            <div>
                <h3>Product</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Productname</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>VendorId</th>
                    <th>Customers</th>
                    </tr>
                </thead>
                <tbody>
                    { this.productList() }
                </tbody>
                </table>
            </div>
            </div>
        )
    }
}