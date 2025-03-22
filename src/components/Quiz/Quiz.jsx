import PropTypes from 'prop-types';
import { useState, Children, createContext } from 'react';
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import './Quiz.css';


export const UserContext = createContext();

function Quiz({children, id, title='This is a Quiz'}) {

  const initialState = Children.map(children, (child, index) => {
    let answerIndex = 0;
    let correct = 'incorrect';

    if(child.props.answerIndex != null) {
      if(child.props.answerIndex != '') {
        answerIndex = child.props.answerIndex;
        // console.log(answerIndex);
      }
    }

    if(answerIndex == 0) {
      correct = 'correct';
    }

    return {radio: 0, correct: correct, answerIndex: child.props.answerIndex}
  });

  console.log(initialState);

  const [questionStates, setQuestionStates] = useState(initialState);
  const [pageState, setPage] = useState(0);
  const [gradeState, setGrade] = useState({grade: '', pass: ''});
  const [gradeMode, setGradeMode] = useState(false);

  // const [isCorrect, setIsCorrect] = useState(answerIndex == 0 ? 'correct' : 'incorrect');

  const checkAnswer = (e) => {
    let curValue = +e.currentTarget.value;
    let curQuestion = +e.currentTarget.dataset.qid;

    // console.log(curQuestion);

    const newVals = [...questionStates];

    for(let i = 0; i < newVals.length; i++) {
      let currentVal = newVals[i];

      if(i == curQuestion) {
        currentVal.radio = curValue;

        if(curValue == currentVal.answerIndex) {
          currentVal.correct = 'correct';
        } else {
          currentVal.correct = 'incorrect';
        }
      }


    }

    //console.log(newVals);
    setQuestionStates(newVals);
  };

  const nextPage = (e) => {
    if(pageState < children.length) {
      setPage(pageState + 1);
    }
  };

  const prevPage = (e) => {
    if(pageState > 0) {
      setPage(pageState - 1);
      setGradeMode(false);
    }
  };

  const checkGrade = () => {
    let correctCount = 0;
    let result = '';
    let pass = 'nopass';

    for(let i = 0; i < questionStates.length; i++) {
      let currentState = questionStates[i];
      
      if(currentState.correct == 'correct') {
        correctCount += 1;
      }
    }

    if(correctCount == questionStates.length) {
      pass = 'pass';
    }

    result = {grade: 'Grade: ' + correctCount + '/' + questionStates.length, pass: pass};
    setGrade(result);
    setGradeMode(true);
  }

  return (<div id={id} className='quizContainer slide p-5 px-4 px-md-5'>
    <div className='slideContent'>
      <h2 className='d-block mt-0 mb-2'>{title}</h2>
      <p className={gradeMode == true ? 'd-block mb-4 ' + gradeState.pass : 'd-block mb-4'}>{gradeMode == true ? <span>{gradeState.grade}</span> : 'Question ' + (pageState + 1) + '/' + children.length}</p>
      <div className='quizQuestions'>
        <UserContext.Provider value={{ questionStates, setQuestionStates, checkAnswer, pageState }}>
        {children}
        </UserContext.Provider>
      </div>
      <br></br>
      <div className='quizButtons'>
        <button disabled={ pageState != children.length - 1 ? true : false} className='btn btn-secondary' onClick={checkGrade}>Grade Quiz</button>
      </div>
      <button type="button" disabled={ pageState > 0 ? false : true } className='btn btn-primary quizNavButton' onClick={prevPage}><GoChevronLeft /></button>
      <button type="button" disabled={ pageState < children.length - 1 ? false : true } className='btn btn-primary quizNavButton' onClick={nextPage}><GoChevronRight /></button>
    </div>
  </div>)
}

export default Quiz