import React,{Component} from 'react';
import axios from 'axios';

export default class CreateReview extends Component{
    constructor(props){
        super(props);

        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            vendorid: '',
            customerid: '',
            content: '',
            rating: '',
        }
    }
    
    onChangeContent(e){
        this.setState({
            content: e.target.value
        });
    }
    
    onChangeRating(e){
        this.setState({
            rating: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const review= {
            vendorid: this.props.match.params.id,
            // productid: this.state.productid,
            customerid: this.props.match.params.id,//use user id
            content: this.state.content,
            rating: this.state.rating,
        }

        console.log(review);

        axios.post('http://localhost:5000/reviews/add', review)
            .then(res => console.log(res.data));

        // window.location = '/';
        this.setState({
            vendorid: '',
            // productid: '',
            customerid: '',
            content: '',
            rating: '',
        });
    }

    render(){
        return(
        <div>
            <h3>Create New Review for VendorId {this.props.match.params.id}</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
                <label>Content: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.content}
                    onChange={this.onChangeContent}
                    />
            </div>
            <div className="form-group"> 
                <label>Rating: </label>
                <input  type="integer"
                    required
                    className="form-control"
                    value={this.state.rating}
                    onChange={this.onChangeRating}
                    />
            </div>
            <div className="form-group">
                <input type="submit" value="Submit Review" className="btn btn-primary" />
            </div>
        </form>
      </div>
       
       )
    }
}