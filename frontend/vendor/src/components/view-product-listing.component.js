import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = props => (
    <tr>
      <td>{props.product.name}</td>
      <td>{props.product.price}</td>
      <td>{props.product.quantity}</td>
      <td>{props.product.status}</td>
      <td>{props.product.vendorid}</td>
      <td>{props.product.buyers}</td>
      <td>
        <Link to={"/edit/"+props.product._id}>edit</Link> | <a href="/viewall" onClick={() => { props.deleteProduct(props.product._id) }}>delete</a>
      </td>
    </tr>
  )

export default class ProductList extends Component{
    constructor(props){
        super(props);

        this.deleteproduct = this.deleteProduct.bind(this);

        this.state = {product : []}
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
        //   console.log(currentproduct);
        if(currentproduct.status === "ready to dispatch" || currentproduct.status === "dispatched"){
            return null;
        }
        else{
          return <Product product={currentproduct} deleteProduct={this.deleteProduct} key={currentproduct._id}/>;
        }
        })
      }

    render(){
        return(
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
        )
    }
}