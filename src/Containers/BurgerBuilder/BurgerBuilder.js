import React, {Component} from 'react';
import axios from '../../axiosOrders';
import Aux from '../../HOC/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner'
import ErrorHandler from '../../HOC/ErrorHandler/ErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.4,
    cheese: 1.2,
    meat: 3,
    bacon: 1.4
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://burger-builder-with-react.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            });
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
        // Go to summary
        const queryParams = [];
        for (let i in this.state.ingredients) {
            //? encodeURIComponent can be used in URL
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i])); 
        }

        queryParams.push('price=' + this.state.totalPrice);

        const queryString = queryParams.join('&')
        
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }
    
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        
        // True values for those that are zero, false otherwise
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }  

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

        if (this.state.ingredients) {
            burger = (
                <Aux>
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

            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients} 
                cancelClicked={this.purchaseCancelHandler}
                continueClicked={this.purchaseContinueHandler}
                price={this.state.totalPrice}/>;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default ErrorHandler(BurgerBuilder, axios);