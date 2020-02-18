import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Review = props => (
    <tr>
      <td>{props.review.vendorid}</td>
      <td>{props.review.productid}</td>
      <td>{props.review.customerid}</td>
      <td>{props.review.content}</td>
      <td>{props.review.rating}</td>
    </tr>
  )

export default class ReviewList extends Component{
    constructor(props){
        super(props);

        this.reviewList = this.reviewList.bind(this);


        this.state = {review : []};
    }

    componentDidMount(){
        console.log("Enters view-review");
        axios.get('http://localhost:5000/reviews/')// + this.props.match.params.id)
            .then(response =>{
                console.log("Entered");
                this.setState({ review: response.data });
                console.log(this.state.review);
            })
            .catch((error) =>{
                console.log(error);
            })
    }

      reviewList() {      
        return this.state.review.map(currentreview => {
        if(currentreview.vendorid === this.props.match.params.id){
            return null;
        }
        else{
          return <Review review={currentreview} deleteReview={this.deleteReview} key={currentreview._id}/>;
        }
        })
      }

    render(){
        return(
          <div>
             <div>
                <h3>Review</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Vendorid</th>
                    <th>ProductId</th>
                    <th>CustomerId</th>
                    <th>Content</th>
                    <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    { this.reviewList() }
                </tbody>
                </table>
            </div>
            </div>
        )
    }
}