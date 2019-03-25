import React from 'react';
import { DropTarget } from 'react-dnd';
import Card from '../Card';
import './styles.css';

const boxTarget = {
    drop(props){
        return { name: props.status}
    }
}

const Column = (props) => {
    return props.connectDropTarget(
        <div className="column-container">
            <div className="column-header">
                <h3>{props.status}</h3>
            </div>
            <div className="tasks-container">
                {props.children}
            </div>
        </div>
    )
}

// export default Column;
export default DropTarget("card", boxTarget, (connect,monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(Column);