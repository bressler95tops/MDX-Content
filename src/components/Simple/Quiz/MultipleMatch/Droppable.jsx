import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import { useContext, useEffect, useState } from 'react';
import { matchContext } from './MultipleMatch';

function Droppable(props) {
  const [dropChild, draggable_objs] = useContext(matchContext);
  let setDraggable = [];
  let setDraggable_obj = [];

  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });

  const style = {
    background: isOver ? "rgba(0, 0, 0, 0.1)" : "none",
    borderRadius: "5px"
  };

  for(let i = 0; i < dropChild.length; i++) {
    let currentDrop = dropChild[i];
    let currentID = currentDrop.id;
    let currentDraggables = currentDrop.draggables;

    if(currentID == props.id) {
        setDraggable = currentDraggables;
        // console.log(setDraggable);
    }
  }

  setDraggable_obj = draggable_objs.filter((child) => {
    let hasMatch = false;

    for(let i = 0; i < setDraggable.length; i++) {
        if(setDraggable[i] == child.props.id) {
            hasMatch = true;
        }
    }

    return hasMatch == true;
  });

  //console.log(setDraggable_obj);

  return (
    <div className='os101_simpleMultipleMatch_dropInner' ref={setNodeRef}>
      <span className="os101_simpleMultipleMatch_dropLabel">{props.children}</span>
      <div style={style} className="os101_simpleMultipleMatch_dropDraggables">
        {setDraggable_obj != null && setDraggable_obj.length > 0 ? setDraggable_obj : 'Drop Items Here'}
      </div>
    </div>
  );
}

export default Droppable