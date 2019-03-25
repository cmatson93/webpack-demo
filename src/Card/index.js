import React from 'react';
import './styles.css';
import { DragSource, DropTarget } from 'react-dnd';

const boxSource = {
    beginDrag(props){
        return {
            id: props.id,
            originalIndex: props.findCard(props.id),
        }
    },
    endDrag(props, monitor) {
        const { id, originalIndex } = monitor.getItem();
        const dropResult = monitor.getDropResult();
        if (dropResult){
            const status = dropResult.name;
            const {index: overIndex} = props.findCard(id);
            props.moveCard(id, overIndex, status);
        }
    }
}

const cardTarget = {
    canDrop() {
        return false
    },
    hover(props, monitor) {
        const {id: draggedId } = monitor.getItem()
        const { id: overId } = props
        if (draggedId !== overId){
            const { index: overIndex } = props.findCard(overId)
            props.moveCard(draggedId, overIndex)
        }
    }
}

const Card = (props) => {
    const {
        isDragging, 
        connectDragSource,
        connectDropTarget
    } = props;

    const opacity = isDragging ? 0.8 : 1;

    return connectDragSource(
        connectDropTarget(
            <div className="card-container" style={{opacity: opacity, background: 'red'}}>
                {props.task.name}
            </div>
        )
    )
}

export default DropTarget("card", cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(
    DragSource("card", boxSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }))(Card)
)