import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
    <tr>
      <td>{props.user.username}</td>
      <td>{props.user.email}</td>
      <td>
        <Link to={"/edit/"+props.user._id}>edit</Link> | <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>delete</a>
      </td>
    </tr>
  )

export default class UserList extends Component{
    constructor(props){
        super(props);

        this.deleteuser = this.deleteUser.bind(this);

        this.state = {users : []}
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users')
            .then(response =>{
                this.setState({ user: response.data })
            })
            .catch((error) =>{
                console.log(error);
            })
    }

    deleteUser(id) {
        axios.delete('http://localhost:5000/users/'+id)
          .then(response => { console.log(response.data)});

        this.setState({
          users: this.state.users.filter(el => el._id !== id)
        })
      }

      userList() {
        return this.state.users.map(currentuser => {
          return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
        })
      }

    render(){
        return(
             <div>
                <h3>User</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Username</th>
                    <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    { this.userList() }
                </tbody>
                </table>
            </div>
        )
    }
}