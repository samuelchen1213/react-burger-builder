import React from 'react';
import Aux from '../../HOC/Aux'


// ! Replace div with proper components
const layout = (props) => (
    <Aux>
        <div>Toolbar, Sidedrawer, Backdrop</div> 
        <main>
            {props.children}
        </main>
    </Aux>
);

export default layout;