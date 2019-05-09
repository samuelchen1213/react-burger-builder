import React, {Component} from 'react';
import axios from '../../axiosOrders';
import Aux from '../../HOC/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.4,
    cheese: 1.2,
    meat: 3,
    bacon: 1.4
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0); 
        
        this.setState({purchaseable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () =>  {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () =>  {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('ONTO CHECKOUTTT');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
            .then(response => {console.log(response)})
            .catch(error => {console.log(error)});
    }
    
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        
        // True values for those that are zero, false otherwise
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        cancelClicked={this.purchaseCancelHandler}
                        continueClicked={this.purchaseContinueHandler}
                        price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;