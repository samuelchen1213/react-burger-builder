import React, {Component} from 'react';
import Aux from '../../../HOC/Aux'
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate() {
        console.log("[OderSummary] WillUpdate");
    }
    
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li><span style={{textTransform: "capitalize"}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>The most amazing burger with the following:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <strong><p>Total Price: {this.props.price.toFixed(2)}</p></strong>
                <p>Continue To Checkout?</p>
                
                <Button clicked={this.props.cancelClicked} btnType="Danger">Cancel</Button>
                <Button clicked={this.props.continueClicked} btnType="Success">Continue</Button>
            </Aux>
        );
    }
 };

export default OrderSummary;