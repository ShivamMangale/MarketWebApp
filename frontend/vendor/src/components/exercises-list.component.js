import React,{Component} from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

const Vendor = props => (
    <tr>
      <td>{props.vendor.username}</td>
      <td>{props.vendor.email}</td>
      {/* <td>
        <Link to={"/edit/"+props.vendor._id}>edit</Link> | <a href="#" onClick={() => { props.deleteVendor(props.vendor._id) }}>delete</a>
      </td> */}
    </tr>
  )

export default class VendorList extends Component{
    constructor(props){
        super(props);

        this.deletevendor = this.deleteVendor.bind(this);

        this.state = {vendor : []}
    }

    componentDidMount(){
        axios.get('http://localhost:5000/vendors')
            .then(response =>{
                console.log("Entered");
                this.setState({ vendor: response.data });
                // console.log(this.state.vendor);
            })
            .catch((error) =>{
                console.log(error);
            })
    }

    deleteVendor(id) {
        axios.delete('http://localhost:5000/vendors/'+id)
          .then(response => { console.log(response.data)});

        this.setState({
          vendors: this.state.vendor.filter(el => el._id !== id)
        })
      }

      vendorList() {
        return this.state.vendor.map(currentvendor => {
          console.log(currentvendor);
          return <Vendor vendor={currentvendor} deleteVendor={this.deleteVendor} key={currentvendor._id}/>;
        })
      }

    render(){
        return(
             <div>
                <h3>Vendor</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Vendorname</th>
                    <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    { this.vendorList() }
                </tbody>
                </table>
            </div>
        )
    }
}