import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Order1 = props => (
    <tr>
      <td>{props.order.productname}</td>
      <td>{props.order.price}</td>
      <td>{props.order.status}</td>
      <td>
        <Link to={"/viewreview/"+props.order.vendorid}>{props.order.vendorid}</Link>
      </td>
      <td>{props.order.quantityleft}</td>
      <td>
        <Link to={"/edit/"+props.order._id}>edit</Link> | <a href="/viewall" onClick={() => { props.deleteOrder(props.order._id) }}>Cancel</a>
      </td>
    </tr>
  )

const Order2 = props => (
    <tr>
      <td>{props.order.productname}</td>
      <td>{props.order.price}</td>
      <td>{props.order.status}</td>
      <td>
        <Link to={"/viewreview/"+props.order.vendorid}>{props.order.vendorid}</Link>
      </td>
      <td>{props.order.quantityleft}</td>
    </tr>
  )

  const Order3 = props => (
    <tr>
      <td>{props.order.productname}</td>
      <td>{props.order.price}</td>
      <td>{props.order.status}</td>
      <td>
        <Link to={"/viewreview/"+props.order.vendorid}>{props.order.vendorid}</Link>
      </td>
      <td>{props.order.quantityleft}</td>
      <td>
        <Link to={"/review/"+props.order._id}>rate and review</Link>
      </td>
    </tr>
  )

export default class OrderList extends Component{
    constructor(props){
        super(props);

        this.deleteorder = this.deleteOrder.bind(this);

        this.state = {order : []}
    }

    componentDidMount(){
        axios.get('http://localhost:5000/orders')
            .then(response =>{
                console.log("Entered");
                this.setState({ order: response.data });
                console.log(this.state.order);
            })
            .catch((error) =>{
                console.log(error);
            })
    }

    deleteOrder(id) {
        axios.delete('http://localhost:5000/orders/'+id)
          .then(response => { console.log(response.data)});

        this.setState({
          order: this.state.order.filter(el => el._id !== id)
        })
      }

      orderList() {
        return this.state.order.map(currentorder => {
        //   console.log(currentorder);
          if(currentorder.status === "waiting"){
            console.log("found a waiting");
          return <Order1 order={currentorder} deleteOrder={this.deleteOrder} key={currentorder._id}/>;
          }
          else if(currentorder.status === "dispatched"){
          return <Order3 order={currentorder} deleteOrder={this.deleteOrder} key={currentorder._id}/>;
          }
          else{
          return <Order2 order={currentorder} deleteOrder={this.deleteOrder} key={currentorder._id}/>;
          }
        })
      }

    render(){
        return(
             <div>
                <h3>Order</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Productname</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>VendorId</th>
                    <th>Quantity Left</th>
                   </tr>
                </thead>
                <tbody>
                    { this.orderList() }
                </tbody>
                </table>
            </div>
        )
    }
}