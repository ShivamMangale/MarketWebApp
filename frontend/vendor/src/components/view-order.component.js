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
        <Link to={"/edit/"+props.order.productid + "/" + props.order._id}>edit</Link> | <a href="/viewall" onClick={() => { props.deleteOrder(props.order._id,props.order.quantity) }}>Cancel</a>
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
        <Link to={"/review/"+props.order.vendorid + "/" + props.order.productid}>rate and review</Link>
      </td>
    </tr>
  )

export default class OrderList extends Component{
    constructor(props){
        super(props);

        this.deleteorder = this.deleteOrder.bind(this);

        this.state = {order : [],val: ''}
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

    deleteOrder(id,chan) {
        axios.post('http://localhost:5000/upquantity/' + id + '/'+ chan)
          .then(response => { console.log(response.data)});
    
        axios.delete('http://localhost:5000/orders/'+id)
          .then(response => { console.log(response.data)});

        this.setState({
          order: this.state.order.filter(el => el._id !== id)
        })
      }

      orderList() {
        return this.state.order.map(currentorder => {
        if(currentorder.customerid === localStorage.getItem("id")){
          if(currentorder.status === "waiting"){
          return <Order1 order={currentorder} deleteOrder={this.deleteOrder} key={currentorder._id}/>;
          }
          else if(currentorder.status === "dispatched"){
          return <Order3 order={currentorder} deleteOrder={this.deleteOrder} key={currentorder._id}/>;
          }
          else{
          return <Order2 order={currentorder} deleteOrder={this.deleteOrder} key={currentorder._id}/>;
          }
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
                <tbody bgcolor="#E6E6FA">
                    { this.orderList() }
                </tbody>
                </table>
            </div>
        )
    }
}