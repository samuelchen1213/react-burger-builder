import React from 'react';
import Aux from '../../HOC/Aux'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import styles from './Layout.css'
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer'

const layout = (props) => (
    <Aux>
        <Toolbar/>
        <Sidedrawer/>
        <main className={styles.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;