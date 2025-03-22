import React, {useState} from 'react';
import Draggable from './Draggable';
import Droppable from './Droppable';

function Matchable({id, type, text, answer, children}) {
    
    return (
    <>
        {type == 'draggable' ? <Draggable id={id} className={type}>{text}</Draggable> : type == 'droppable' ? <Droppable answer={answer} id={id} className={type}>{text}</Droppable> : 'Not a valid matchable...'}
    </>
    );
}

export default Matchable