import React, { Component } from "react";
import axios from '../../../axiosOrders';
import Button from '../../../Components/UI/Button/Button';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import classes from './ContactData.css';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading:false
    }
    
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Samuel Chen",
                address: {
                    street: "Testing street",
                    zipCode: "827356",
                    country: "Canada"
                },
                email: "testing@testingemail.com"
            },
            deliveryMethod: "fastest"
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false})
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({loading: false})
            });
    }

    render() {
        let form = (
        <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
            <input className={classes.Input} type="text" name="email" placeholder="Your Email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Your Street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code"/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);

        if (this.state.loading) {
            form = <Spinner/>;
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Info</h4>
                {form}
            </div>
        );
    }
}

export default ContactData