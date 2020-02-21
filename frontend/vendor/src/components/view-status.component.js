import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class ViewStatus extends Component{
    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            quantityleft: '',
            productid: '',
            status: 'cancelled',
            orderid: this.props.match.params.id,
            vendorid: this.props.match.params.vendorid
        }
    }

    componentDidMount(){
        
        axios.get('http://localhost:5000/orders/productid/' + this.state.orderid)
            .then(res => {
                console.log("got the productid");
                this.setState({
                    productid: res.data
                });
                console.log(this.state.productid);
                axios.get('http://localhost:5000/products/status/' +  this.state.productid)
                    .then(res => {
                        console.log("got the status");
                        console.log(res.data);
                        this.setState({
                            status: res.data
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
                axios.get('http://localhost:5000/products/getquantityleft/' +  this.state.productid)
                    .then(res => {
                        console.log("got the quantityleft");
                        this.setState({
                            quantityleft: res.data
                        });
                    })
                    .catch(error => console.log(error));

            })
            .catch(err => console.log(err));
     
    }    

    
    onSubmit(e){
        e.preventDefault();
        window.location = "/viewall"
    }


    printList() {
        if(this.state.status === "waiting" || this.state.status === "Waiting"){
            return (
            <div>
                <thead className="thead-light">
                    <tr>
                    <th>Orderid<br></br></th>
                    <th>Quantity Left</th>
                    <th></th>
                    <th></th>
                   </tr>
                </thead>
                <tbody bgcolor="#E6E6FA">
                    <tr>
                        <td>"waiting"</td>
                        <td>{this.state._id}</td>
                        <td>{this.state.quantityleft}</td>
                        <td>"whitespace"</td>
                        <td>
                            <Link to={"/edit/"+this.state.productid + "/" + this.state._id}>edit</Link>
                        </td>
                    </tr>
                </tbody>
            </div>
            )
        }
        else if(this.state.status === "dispatched"){
            return (    
            <div>
                <tr>
                    <td>"dispatched"</td>
                    <td>
                        <Link to={"/review/"+ this.state.orderid + "/" + this.state.productid}>rate and review</Link>
                    </td>
                </tr>
            </div>
            )
        }
        else if(this.state.status === "ready to dispatch"){
            return (
                <div>
                <tr>
                    <td>"ready to dispatch"</td>
                    
                    <td>
                        <Link to={"/ratevendor/"+ this.state.vendorid }>rate and review</Link>
                    </td>
                </tr>
                </div>
            )
        }
        else{
            return (
            <div>
                <tr>
                    <td>"cancelled"</td>
                </tr>
            </div>
            )
        }
      }

    render(){
        return(
        <div>
            <h3>Enter the order id</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group" > 
                <label>Orderid: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.orderid}
                    />
            </div>
            <div className="form-group" > 
                <label>Order Status: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.status}
                    />
            </div>
            <div>
                    { this.printList() }
            </div>
            <div className="form-group">
                <input type="submit" value="Go Back" className="btn btn-primary" />
            </div>
        </form>
      </div>
       
       )
    }
}