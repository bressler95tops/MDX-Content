import './Match.css';
import React, {useState, Children, createContext, useEffect, useRef} from 'react';
import {useContext} from 'react';
import {DndContext} from '@dnd-kit/core';
import { quizContext } from '../SimpleQuiz';
import { GoCheckCircleFill } from "react-icons/go";

export const matchContext = createContext();

function Match({children, index = -1, question = 'Is this a unique question?'}) {
  const selfRef = useRef(null);

  const defaultDrop = Children.map(children, (child) => {
    let childID = child.props.id;
    if(childID.includes("droppable")) {
      let result = childID + "::" + "null";
      return result;
    }
  });

  const defaultScore = Children.map(children, (child) => {
    let childID = child.props.id;
    let childAnswer = child.props.answer;
  
    if(childID.includes("droppable")) {
      let result = childID + "::" + "false" + "::" + childAnswer;
      return result;
    }
  });

  const [dropChild, setDropChild] = useState(defaultDrop);
  const [score, setScore] = useState(defaultScore);
  const [correct, handleCorrect, parent] = useContext(quizContext);

  const draggable_ids = Children.map(children, (child) => {
    let childID = child.props.id;
    if(childID.includes("draggable")) {
      return childID;
    }
  });

  const draggable_objs = Children.map(children, (child) => {
    let childID = child.props.id;
    if(childID.includes("draggable")) {
      return child;
    }
  });

  const droppable_objs = Children.map(children, (child) => {
    let childID = child.props.id;

    if(childID.includes("droppable")) {
      return child;
    }
  });

  const handleDragEnd = (event) => {
    //Draggable
    let active = event.active;
    //Droppable
    let over = event.over;
    let correctCount = 0;

    if(active != null && over != null) {
      // console.log("Active: " + active.id);
      // console.log("Over: " + over.id);

      const result = dropChild.map((child, index) => {
        let splitChild = child.split("::");
        let splitID = splitChild[0];
        let splitVal = splitChild[1];

        if(splitID == over.id) {
          return splitID + "::" + active.id;
        } else {
          if(splitVal == active.id) {
            return splitID + "::" + "null";
          } else {
            return child;
          }
          
        }
      });

      const scoreResult = score.map((child, index) => {
        let splitChild = child.split("::");
        let splitDrop = result[index].split("::");
        let splitID = splitChild[0];
        let splitVal = splitChild[1];
        let splitAnswer = splitChild[2];
  
        if(splitAnswer == splitDrop[1]) {
          correctCount += 1;
          return splitID + "::" + "true" + "::" + splitAnswer;
        } else {
          return splitID + "::" + "false" + "::" + splitAnswer;
        }
      });

      // console.log(result);
      setDropChild(result);
      setScore(scoreResult);
    } else if(active != null && over == null) {
      // console.log("Active: " + active.id);
      // console.log("Over: " + "Nothing");

      const result = dropChild.map((child, index) => {
        let splitChild = child.split("::");
        let splitID = splitChild[0];
        let splitVal = splitChild[1];

        if(splitVal == active.id) {
          return splitID + "::" + "null";
        } else {
          return child;
        }
      });

      const scoreResult = score.map((child, index) => {
        let splitChild = child.split("::");
        let splitDrop = result[index].split("::");
        let splitID = splitChild[0];
        let splitVal = splitChild[1];
        let splitAnswer = splitChild[2];
  
        if(splitAnswer == splitDrop[1]) {
          correctCount += 1;
          return splitID + "::" + "true" + "::" + splitAnswer;
        } else {
          return splitID + "::" + "false" + "::" + splitAnswer;
        }
      });

      // console.log(result);
      setDropChild(result);
      setScore(scoreResult);
    }

    if(correctCount == score.length) {
      handleCorrect(index, 'true');
    } else {
      handleCorrect(index, 'false');
    }

  };

  return (
    <>
    <h3 className="os101_simpleMatch_title">{question}</h3>
    <p>Match each item to their description:</p>
    <div ref={selfRef} className='os101_simpleMatch' data-index={index}>
      <DndContext onDragEnd={handleDragEnd}>
      <matchContext.Provider value={[dropChild, draggable_objs]}>
        
        <div className='os101_simpleMatch_row'>
          <div className="os101_simpleMatch_title">Term / Concept</div>
          <div className="os101_simpleMatch_title">Definition</div>
        </div>

        {draggable_ids.map((child, index) => {
          let count = 0;

          for(let i = 0; i < dropChild.length; i++) {
            let currentChild = dropChild[i];
            let splitChild = currentChild.split("::");

            if(child == splitChild[1]) {
              count ++;
            }
          }

          if(count > 0) {
            return <div style={{borderBottom: index + 1 >= draggable_ids.length ? "none" : "1px solid #CCC"}} className='os101_simpleMatch_row'><div className="os101_simpleMatchable"><span className="os101_simpleMatch_dragDragged os101_simpleMatch_dropSize">Drag Term Back to Reset</span></div><div className="os101_simpleMatchable">{droppable_objs[index]}</div></div>
          } else {
            return <div style={{borderBottom: index + 1 >= draggable_ids.length ? "none" : "1px solid #CCC"}} className='os101_simpleMatch_row'><div className="os101_simpleMatchable">{draggable_objs[index]}</div><div className="os101_simpleMatchable">{droppable_objs[index]}</div></div>
          }
        })}
        
        
        {/* {Children.map(children, (child) => {
          let childID = child.props.id;

          if(childID.includes("droppable")) {
            return <div className="os101_simpleMatchable">{child}</div>
          }
        })} */}
        
        </matchContext.Provider>
      </DndContext>
    </div>
    {correct[index].split('::')[1] == 'true' ? <span className='os101_simpleQuiz_questionStat' style={{backgroundColor: 'green', color: 'white'}}><GoCheckCircleFill /> Correct</span> : null}
    </>
  );

}

export default Match