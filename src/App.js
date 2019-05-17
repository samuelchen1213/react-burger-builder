import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Layout from './Containers/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/" exact component={BurgerBuilder} />
                </Layout>
            </div>
        );
    }
}

export default App;
