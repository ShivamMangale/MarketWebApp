import React,{Component} from 'react';
import axios from 'axios';

export default class CreateReview extends Component{
    constructor(props){
        super(props);

        // this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            vendorid: '',
            customerid: '',
            productid: '',
            content: '',
            rating: '',
        }
    }
    

    // onChangeContent(e){
    //     this.setState({
    //         content: e.target.value
    //     });
    // }
    
    onChangeRating(e){
        this.setState({
            rating: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const review= {
            vendorid: this.props.match.params.id,
            rating: this.state.rating
        }

        // console.log(review);
        // var val = this.state.rating;
        
        axios.post('http://localhost:5000/reviews/rate', review)
            .then(res => console.log(res.data))
            .catch(error => {
                alert(error);
                console.log(error);
            });

        // window.location = '/';
        this.setState({
            vendorid: '',
            productid: '',
            customerid: '',
            content: '',
            rating: '',
        });
    }

    render(){
        return(
        <div>
            <h3>Give rating for Product {this.props.match.params.id}</h3>
            <form onSubmit={this.onSubmit}>
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