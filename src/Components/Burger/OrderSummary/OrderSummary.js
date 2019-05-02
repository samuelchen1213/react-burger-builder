import React from 'react';
import Aux from '../../../HOC/Aux'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li><span style={{textTransform: "capitalize"}}>{igKey}</span>: {props.ingredients[igKey]}</li>
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>The most amazing burger with the following:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue To Checkout?</p>
        </Aux>
    );
 };

export default orderSummary;