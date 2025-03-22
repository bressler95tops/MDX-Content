import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import { useContext, useEffect, useState } from 'react';
import { matchContext } from './Match';

function Droppable(props) {
  const [dropChild, draggable_objs] = useContext(matchContext);
  let setDraggable = "null";

  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    background: isOver ? "rgba(0, 0, 0, 0.1)" : "none",
    borderRadius: "5px"
  };

  for(let x = 0; x < dropChild.length; x++) {
    let currentChild = dropChild[x];
    let splitChild = currentChild.split("::");
    let splitID = splitChild[0];
    let splitVal = splitChild[1];

    if(splitID == props.id) {
      for(let y = 0; y < draggable_objs.length; y++) {
        let currentDraggable = draggable_objs[y];

        if(currentDraggable.props.id == splitVal) {
          setDraggable = currentDraggable;
        }
      }
      
    }
  }

  useEffect(() => {
    // console.log("TESTING DROP CHILD CHANGE");
    // console.log(dropChild);

    // for(let z = 0; z < dropChild.length; z++) {
    //   let currentChild = dropChild[z];
    //   let splitChild = currentChild.split("::");
    //   let splitID = splitChild[0];
    //   let splitVal = splitChild[1];
  
    //   if(splitID == props.id && splitVal == props.answer) {
    //     // console.log("The Answer: " + props.answer);
    //     // console.log("The Value: " + splitVal);
    //     handleScore(props.id, 'true');
    //     // console.log("CORRECT");
    //   } else if(splitID == props.id && splitVal != props.answer) {
    //     // console.log("The Answer: " + props.answer);
    //     // console.log("The Value: " + splitVal);
    //     handleScore(props.id, 'false');
    //     // console.log("INCORRECT");
    //   }
    // }

  }, [dropChild]);

  return (
    <div ref={setNodeRef} style={style}>
      
      {setDraggable != "null" ? setDraggable : <span className="os101_simpleMatch_dropLabel os101_simpleMatch_dropSize">{props.children}</span>}
    </div>
  );
}

export default Droppable