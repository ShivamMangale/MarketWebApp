import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Order = props => (
    <tr>
      <td>{props.order.productname}</td>
      <td>{props.order.price}</td>
      <td>{props.order.quantity}</td>
      <td>{props.order.status}</td>
      <td>{props.order.vendorid}</td>
      <td>
        <Link to={"/edit/"+props.order._id}>edit</Link> | <a href="/viewall" onClick={() => { props.deleteOrder(props.order._id) }}>Cancel</a>
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
        if(currentorder.status === "ready to dispatch"){
            return null;
        }
        else{
          return <Order order={currentorder} deleteOrder={this.deleteOrder} key={currentorder._id}/>;
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
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>VendorId</th>
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