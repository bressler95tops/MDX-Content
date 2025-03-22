import { createContext, useState, useContext } from 'react';
import './FillBlank.css';
import { Children } from 'react';
import { quizContext } from '../SimpleQuiz';
import { GoCheckCircleFill } from "react-icons/go";

export const fillBlankContext = createContext();

function FillBlank({children, index = -1, question = 'Is this a unique question?', answer = ''}) {

  const [correct, handleCorrect, parent] = useContext(quizContext);

  const slugify = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  let slug = slugify(question) + '-question';

  const handleCheck = (e) => {
    let input = e.currentTarget.value;
    
    if(input.toLowerCase() == answer.toLowerCase()) {
      handleCorrect(index, 'true');
      console.log('setting to true');
    } else {
      handleCorrect(index, 'false');
    }
  };

  return (
    <div id={slug} className='os101_simpleFillBlank' data-index={index}>
        <h3>{question}</h3>
        <p>Fill in the blank below.</p>
        <div className='os101_simpleFillBlank_interactive'>
          <fillBlankContext.Provider value={[handleCheck, answer]}>
          {children}
          </fillBlankContext.Provider>
        </div>
        {correct[index].split('::')[1] == 'true' ? <span className='os101_simpleQuiz_questionStat' style={{backgroundColor: 'green', color: 'white'}}><GoCheckCircleFill /> Correct</span> : null }
    </div>
  );
  
}

export default FillBlank