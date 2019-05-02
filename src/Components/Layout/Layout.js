import React from 'react';
import Aux from '../../HOC/Aux'

import styles from './Layout.css'

const layout = (props) => (
    <Aux>
        
        <div>Toolbar, Sidedrawer, Backdrop</div> 
        <main className={styles.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;