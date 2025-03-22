import React, {useState} from 'react';
import Draggable from './Draggable';
import Droppable from './Droppable';

function MultipleMatchable({id, type, text, answers, children}) {
    
    return (
    <>
        {type == 'draggable' ? <Draggable id={id} className={type}>{text}</Draggable> : type == 'droppable' ? <Droppable answers={answers} id={id} className={type}>{text}</Droppable> : 'Not a valid matchable...'}
    </>
    );
}

export default MultipleMatchable