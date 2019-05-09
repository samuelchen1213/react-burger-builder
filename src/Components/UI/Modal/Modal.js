import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../HOC/Aux';
import BackDrop from '../Backdrop/Backdrop'

class Modal extends Component {   
    
    // Only updates if this.props.show changes
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.show !== this.props.show || nextProps.children !== this.props.children) {
            return true;
        } else {
            return false;
        }
    }

    componentWillUpdate () {
        console.log("[Modal] WillUpdate");
    }
    
    render() {
        return (
            <Aux>
                <BackDrop show={this.props.show} clicked ={this.props.modalClosed}/>
                <div className={classes.Modal} 
                    style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)', 
                            opacity: this.props.show ? '1' : '0'}}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }   
}

export default Modal;