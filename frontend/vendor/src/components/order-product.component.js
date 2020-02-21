import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import sort from 'fast-sort';

var searched = "kpandvpnea";

const Product = props => (
    <tr>
      <td>{props.product.name}</td>
      <td>{props.product.price}</td>
      <td>{props.product.quantityleft}</td>
      {/* <td>{props.product.status}</td> */}
      <td>
        <Link to={"/viewreview/"+props.product.vendorid}>{props.product.vendorid}</Link>
      </td>      
      <td>{props.product.rating}</td>
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
        this.onChangeSortType = this.onChangeSortType.bind(this);
        this.getrating = this.getrating.bind(this);

        this.state = {name : '',
                      product: [], 
                      review: [],
                      sorttype: 'price', 
                      types: ["price", "quantity left", "seller rating"],
                      quantityleft: '',
                      ratings: []
                    };
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
                alert(error);
            });
        axios.get('http://localhost:5000/reviews')
            .then(response =>{
                console.log("Entered");
                this.setState({ review: response.data });
                console.log(this.state.review);
            })
            .catch((error) =>{
                console.log(error);
                alert(error);
            });
        axios.get('http://localhost:5000/reviews/ratings')
            .then(response =>{
                console.log("Entered");
                this.setState({ ratings: response.data });
                console.log(this.state.review);
            })
            .catch((error) =>{
                console.log(error);
                alert(error);
            });
    }

    deleteProduct(id) {
        axios.delete('http://localhost:5000/products/'+id)
          .then(response => { console.log(response.data)});

        this.setState({
          product: this.state.product.filter(el => el._id !== id)
        })
      }

      onChangeSortType(e){
        this.setState({
            sorttype: e.target.value
        });
      }

      getrating(id){
        let val = 0;
        let co = 0;
        let final = 0.0;
        this.state.ratings.map(currentrating => {
          if(currentrating.vendorid === id){
              val = val + currentrating.rating;
              co = co + 1;
          }
          })
        if(co === 0){
          co = 1;
        }
        final = val/co;
        if(final === 0){
          final = "N/A";
        }
        console.log(id," ",val);
        return final;
      }

      productList() {
        let listofproducts = '';
        if(this.state.sorttype === "price"){
        listofproducts = sort(this.state.product).asc(u => u.price);
        }
        else if(this.state.sorttype === "quantity left"){
        listofproducts = sort(this.state.product).asc(u => u.quantityleft);
        }
        else{
        listofproducts = sort(this.state.product).desc(u => u.rating);
        }
        return listofproducts.map(currentproduct => {
        //   console.log(currentproduct.name);
        if((currentproduct.name !== this.state.name && this.state.name) || (currentproduct.status !== "waiting" && currentproduct.status !== "Waiting")){
            // console.log(this.state.search);
            return null;
        }
        else{
          currentproduct.rating = this.getrating(currentproduct.vendorid);
          return <Product product={currentproduct} deleteProduct={this.deleteProduct} key={currentproduct._id}/>;
        }
        })
      }

      onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }

    render(){
        return(
            <div>
            <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
              <label>Sort by: </label>
              <select ref="userInput"
                  required
                  className="form-control"
                  value={this.state.sorttype}
                  onChange={this.onChangeSortType}>
                  {
                    this.state.types.map(function(type) {
                      return <option 
                        key={type}
                        value={type}>{type}
                        </option>;
                    })
                  }
              </select>
            </div>
          </form>
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
                    <th>Quantity Left</th>
                    {/* <th>Status</th> */}
                    <th>VendorId</th>
                    <th>Rating</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody bgcolor="#E6E6FA">
                    { this.productList() }
                </tbody>
                </table>
            </div>
            </div>
        )
    }
}