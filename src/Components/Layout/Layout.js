import React from 'react';
import Aux from '../../HOC/Aux'
import classes from './Layout.css'


// ! Replace div with proper components
const layout = (props) => (
    <Aux>
        <div>Toolbar, Sidedrawer, Backdrop</div> 
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;