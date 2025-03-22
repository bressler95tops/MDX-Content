import './MultipleMatch.css';
import React, {useState, Children, createContext} from 'react';
import {useContext} from 'react';
import {DndContext} from '@dnd-kit/core';
import { quizContext } from '../SimpleQuiz';
import { GoCheckCircleFill } from "react-icons/go";

export const matchContext = createContext();

function MultipleMatch({children, index = -1, question = 'Is this a unique question?'}) {

  const defaultDrop = Children.map(children, (child) => {
        let childID = child.props.id;
        if(childID.includes("droppable")) {
            let result = {id: childID, draggables: []};
            return result;
        }
  });

  const defaultScore = Children.map(children, (child) => {
      let childID = child.props.id;
      let childAnswers = '';
    
      if(childID.includes("droppable")) {
        childAnswers = child.props.answers;
        let result = {id: childID, answers: childAnswers, status: 'false'};
        return result;
      }
  });

  const [dropChild, setDropChild] = useState(defaultDrop);
  const [score, setScore] = useState(defaultScore);
  const [correct, handleCorrect, parent] = useContext(quizContext);

  const draggable_objs = Children.map(children, (child) => {
    let childID = child.props.id;
    if(childID.includes("draggable")) {
      return child;
    }
  });

  const draggable_ids = Children.map(children, (child) => {
    let childID = child.props.id;
    if(childID.includes("draggable")) {
      return childID;
    }
  });

  const droppable_objs = Children.map(children, (child) => {
    let childID = child.props.id;
    if(childID.includes("droppable")) {
      return child;
    }
  });

  const handleDragEnd = (event) => {
    let active = event.active;
    let over = event.over;
    let correctDrops = 0;

    if(active != null && over != null) {

        const result = dropChild.map((child, index) => {
            let stateID = child.id;
            let stateDraggables = child.draggables;
            let targetDraggables = stateDraggables;

                if(stateID == over.id) {
                    let exists = 0;

                    if(stateDraggables != null && stateDraggables.length > 0) {
                        for(let i = 0; i < stateDraggables.length; i++) {
                            let currentDraggable = stateDraggables[i];

                            if(currentDraggable == active.id) {
                                exists += 1;
                            }
                        }
                    }

                    if(exists == 0) {
                        targetDraggables.push(active.id);
                    }

                    return {id: stateID, draggables: targetDraggables};
                } else {
                    let exists = 0;

                    if(stateDraggables != null && stateDraggables.length > 0) {
                        for(let i = 0; i < stateDraggables.length; i++) {
                            let currentDraggable = stateDraggables[i];

                            if(currentDraggable == active.id) {
                                exists += 1;
                            }
                        }
                    }

                    if(exists > 0) {
                        targetDraggables = stateDraggables.filter((child_two) => {
                            return child_two != active.id;
                        });

                        return {id: stateID, draggables: targetDraggables};
                    } else {
                        return child;
                    }
                
                }
        });

        const scoreResult = score.map((child) => {
            let scoreID = child.id;
            let scoreAnswers = child.answers;
            let scoreAnswersSplit = scoreAnswers.toString().split(",");
            let scoreStatus = child.status;
            let targetStatus = scoreStatus;
      
            for(let i = 0; i < result.length; i++) {
                let currentDrop = result[i];
                let currentDropID = currentDrop.id;
                let currentDropDraggables = currentDrop.draggables;

                if(scoreID == currentDropID) {
                    let correctCount = 0;

                    for(let x = 0; x < scoreAnswersSplit.length; x++) {
                        let sa = scoreAnswersSplit[x];

                        for(let y = 0; y < currentDropDraggables.length; y++) {
                            let cdd = currentDropDraggables[y];

                            if(sa == cdd) {
                                correctCount++;
                            }
                        }
                    }

                    if(correctCount == scoreAnswersSplit.length && currentDropDraggables.length == scoreAnswersSplit.length) {
                        targetStatus = 'true';
                    } else {
                        targetStatus = 'false';
                    }
                }

            }

            if(targetStatus == 'true') {
                correctDrops++;
            }

            return {id: scoreID, answers: scoreAnswers, status: targetStatus};
        });

        console.log(scoreResult);
      
        setDropChild(result);
        setScore(scoreResult);
    } else if(active != null && over == null) {
        const result = dropChild.map((child, index) => {
            let stateID = child.id;
            let stateDraggables = child.draggables;
            let targetDraggables = stateDraggables;

            let exists = 0;

            if(stateDraggables != null && stateDraggables.length > 0) {
                for(let i = 0; i < stateDraggables.length; i++) {
                    let currentDraggable = stateDraggables[i];

                    if(currentDraggable == active.id) {
                        exists += 1;
                    }
                }
            }

            if(exists > 0) {
                targetDraggables = stateDraggables.filter((child_two) => {
                    return child_two != active.id;
                });

                return {id: stateID, draggables: targetDraggables};
            } else {
                return child;
            }
    
        });

        const scoreResult = score.map((child) => {
            let scoreID = child.id;
            let scoreAnswers = child.answers;
            let scoreAnswersSplit = scoreAnswers.toString().split(",");
            let scoreStatus = child.status;
            let targetStatus = scoreStatus;
      
            for(let i = 0; i < result.length; i++) {
                let currentDrop = result[i];
                let currentDropID = currentDrop.id;
                let currentDropDraggables = currentDrop.draggables;

                if(scoreID == currentDropID) {
                    let correctCount = 0;

                    for(let x = 0; x < scoreAnswersSplit.length; x++) {
                        let sa = scoreAnswersSplit[x];

                        for(let y = 0; y < currentDropDraggables.length; y++) {
                            let cdd = currentDropDraggables[y];

                            if(sa == cdd) {
                                correctCount++;
                            }
                        }
                    }

                    if(correctCount == scoreAnswersSplit.length && currentDropDraggables.length == scoreAnswersSplit.length) {
                        targetStatus = 'true';
                    } else {
                        targetStatus = 'false';
                    }
                }

            }

            if(targetStatus == 'true') {
                correctDrops++;
            }

            return {id: scoreID, answers: scoreAnswers, status: targetStatus};
        });

        console.log(scoreResult);
        
        setDropChild(result);
        setScore(scoreResult);
    }

    if(correctDrops == score.length) {
        handleCorrect(index, 'true');
    } else {
        handleCorrect(index, 'false');
    }

  };

  return (
    <>
    <h3 className="os101_simpleMultipleMatch_title">{question}</h3>
    <p>Drag and drop phrases into corresponding term below.</p>
    <div className='os101_simpleMultipleMatch' data-index={index}>
      <DndContext onDragEnd={handleDragEnd}>
      <matchContext.Provider value={[dropChild, draggable_objs]}>
        <div className="os101_simpleMultipleMatch_draggables">
            {draggable_objs.map((child, index) => {
                let showObj = true;

                if(dropChild != null && dropChild.length > 0) {
                    for(let x = 0; x < dropChild.length; x++) {
                        let currentDrop = dropChild[x];
                        let currentDraggables = currentDrop.draggables;
                        let matchCount = 0;

                        if(currentDraggables != null && currentDraggables.length > 0) {
                            for(let y = 0; y < currentDraggables.length; y++) {
                                let theDraggable = currentDraggables[y];
                                
                                if(theDraggable == draggable_ids[index]) {
                                    matchCount++;
                                }
                            }
                        }

                        if(matchCount > 0) {
                            showObj = false;
                        }
                    }
                }

                if(showObj == true) {
                    return <div className="os101_simpleMultipleMatchable">{child}</div>
                } else {
                    return null;
                }
            
            })}
        </div>
        <div className="os101_simpleMultipleMatch_droppables">
            {droppable_objs.map((child, index) => {
                return <div className="os101_simpleMultipleMatchable">{child}</div>
            
            })}
        </div>
        </matchContext.Provider>
      </DndContext>
    </div>
    {correct[index].split('::')[1] == 'true' ? <span className='os101_simpleQuiz_questionStat' style={{backgroundColor: 'green', color: 'white'}}><GoCheckCircleFill /> Correct</span> : null}
    </>
  );

}

export default MultipleMatch