import React, {Component} from 'react';
import Aux from '../../HOC/Aux'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import styles from './Layout.css'
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    drawerToggleClicked = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return(
            <Aux>
                <Toolbar clicked={this.drawerToggleClicked}/>
                <Sidedrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;