import React from 'react';
import Aux from '../../HOC/Aux'
import styles from './Layout.css'

// ! Replace div with proper components
const layout = (props) => (
    <Aux>
        <div>Toolbar, Sidedrawer, Backdrop</div> 
        <main className={styles.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;