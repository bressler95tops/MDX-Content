import './SimpleQuiz.css';
import {useParams} from 'react-router-dom';
import { Children, useState, useContext, useRef, createContext, cloneElement, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import VisibilitySensor from "react-visibility-sensor";
import { modeContext } from '../../../App';

export const quizContext = createContext();

function SimpleQuiz({children, id}) {

  const initialQuestion = Children.map(children, (child, index) => {
    let result = 'noshow';

    if(index == 0) {
      result = 'show';
    }

    return result;
  });

  const initialCorrect = Children.map(children, (child, index) => {
    let result = index + '::false';

    return result;
  });
  
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestion);
  const [correct, setCorrect] = useState(initialCorrect);
  const [grade, setGrade] = useState('hideGrade');
  const [tempGrade, setTempGrade] = useState('hideTempGrade');
  const [tempPercent, setTempPercent] = useState(0);
  const [courseMode, handleCompletion, completion, handleLessonCompletion, lessonCompletion, handleSaveDom, savedDom, unparsedDom] = useContext(modeContext);
  const params = useParams();
  let idParam = params.id;
  let lidParam = params.lid;
  const parent = useRef(null);

  const handleDisplay = (inputIndex) => {
    let result = currentQuestion.map((child, index) => {
      if(inputIndex == index) {
        return 'show';
      } else {
        return 'noshow';
      }
    });

    setCurrentQuestion(result);
  };

  const handleCorrect = (indexParam, valueParam) => {
    let result = correct.map((child, index) => {
      if(index == indexParam) {
        return index + '::' + valueParam;
      } else {
        return child;
      }
    });

    setCorrect(result);

    // console.log(id);
    let tempCorrect = 0;

    for(let i = 0; i < result.length; i++) {
      let currentCorrect = result[i];
      let splitCorrect = currentCorrect.split("::");
      let splitIndex = splitCorrect[0];
      let splitVal = splitCorrect[1];

      if(splitVal == 'true') {
        tempCorrect += 1;
      }
    }

    let parsedPercent = parseFloat(tempCorrect / correct.length) * 100;

    if(id != null) {
      let newLid;
      let doit = false;

      if(idParam != null && lidParam != null) {
        doit = true;
        newLid = lidParam;

      } else if(idParam != null && lidParam == null) {
        doit = true;
        
        newLid = completion[idParam - 1][0].id;
      }

      // console.log("Saving dom...");
      // console.log(parsedPercent);
      handleSaveDom(idParam, newLid, id, parseInt(parsedPercent));

    }
  }

  const goNext = () => {
    let currentIndex = getStateIndex();

    if(currentIndex + 1 < currentQuestion.length) {
      currentIndex += 1;
      handleDisplay(currentIndex)
    }
  };

  const goPrev = () => {
    let currentIndex = getStateIndex();

    if(currentIndex -1 >= 0) {
      currentIndex -= 1;
      handleDisplay(currentIndex)
    }
  };

  const getStateIndex = () => {
    let result = -1;

    for(let i = 0; i < currentQuestion.length; i++) {
      if(currentQuestion[i] == 'show') {
        result = i;
        break;
      }
    }

    return result;
  };

  const getCorrectPercent = () => {
    let result = 0;

    for(let i = 0; i < correct.length; i++) {
      let currentCorrect = correct[i];
      let splitCorrect = currentCorrect.split("::");
      let splitIndex = splitCorrect[0];
      let splitVal = splitCorrect[1];

      if(splitVal == 'true') {
        result += 1;
      }
    }

    return parseFloat(result / correct.length) * 100;
  }

  const injectSavedDom= () => {
    console.log("ID AND LID CHANGED IN QUIZ");
    if(id != null) {
      if(savedDom[idParam - 1][lidParam] != null) {
        let currentDom = savedDom[idParam - 1][lidParam].elements;
        
        for(let i = 0; i < currentDom.length; i++) {
          let quiz = currentDom[i];
          if(quiz.qid == id) {
            console.log(currentDom);
            let quizPercentage = quiz.percentage;
            setTempPercent(quizPercentage);
            setTempGrade('showTempGrade');
            break;
          }
        }
      }
    }
  }

  useEffect(() => {
    injectSavedDom();

  }, [idParam, lidParam]);

  useEffect(() => {
    console.log("SAVED DOM");
    injectSavedDom();
  }, [unparsedDom]);

  return (
    <div ref={parent} id={id} className='os101_simpleQuiz' style={{backgroundImage: 'url(./images/bluebgtexture.png)'}}>
        <div className='os101_simpleQuiz_overlay'></div>
        <div className={'os101_simpleQuiz_container ' + grade + ' ' + tempGrade}>
          <quizContext.Provider value={[correct, handleCorrect, parent]}>
          {children != null ? Children.map(children, (child, index) => {return <div className={'os101_simpleQuiz_question ' + currentQuestion[index]}>{cloneElement(child, {index: index})}</div>}) : <p className="os101_simpleQuiz_noQuestions">No questions have been added...</p>}
          </quizContext.Provider>
          <Button title='Previous Question' disabled={currentQuestion[0] == 'show'} className='os101_simpleQuiz_nav left' onClick={goPrev} variant="primary"><GoChevronLeft/></Button>
          <Button title='Next Question' disabled={currentQuestion[currentQuestion.length - 1] == 'show'} className='os101_simpleQuiz_nav right' onClick={goNext} variant="primary"><GoChevronRight/></Button>
          {getStateIndex() == currentQuestion.length -1 ? <div className='os101_simpleQuiz_submit'><Button type="button" onClick={() => setGrade('showGrade')} variant="primary">Get Score</Button></div> : null }
        </div>
        <div className={'os101_simpleQuiz_grade ' + grade}>
          <h3>Your Score</h3>
          <div style={{width: '200px', height: '200px', marginBottom: '24px'}}>
            <span className="hiddenPercentage">{parseInt(getCorrectPercent()).toString()}</span>
            <VisibilitySensor>
              {({ isVisible }) => {
                const percentage = isVisible ? parseInt(getCorrectPercent()) : 0;
                return (
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                      // Rotation of path and trail, in number of turns (0-1)
                      rotation: 0.25,
      
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: 'round',
      
                      // Text size
                      textSize: '16px',
      
                      // How long animation takes to go from one percentage to another, in seconds
                      pathTransitionDuration: 1.0,
      
                      // Can specify path transition in more detail, or remove it entirely
                      // pathTransition: 'none',
      
                      // Colors
                      pathColor: 'var(--bg-dark)',
                      textColor: 'var(--primary-button-bg)',
                      trailColor: '#E1E1E1',
                      backgroundColor: '#000',
                    })}
                  />
                );
              }}
            </VisibilitySensor>
          </div>
          <div className='os101_simpleQuiz_submit'><Button type="button" onClick={() => setGrade('hideGrade')} variant="primary">Try Again</Button></div>
        </div>
        <div className={'os101_simpleQuiz_grade ' + tempGrade}>
          <h3>Your Score</h3>
          <div style={{width: '200px', height: '200px', marginBottom: '24px'}}>
            <VisibilitySensor>
              {({ isVisible }) => {
                const percentage = isVisible ? tempPercent : 0;
                return (
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                      // Rotation of path and trail, in number of turns (0-1)
                      rotation: 0.25,
      
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: 'round',
      
                      // Text size
                      textSize: '16px',
      
                      // How long animation takes to go from one percentage to another, in seconds
                      pathTransitionDuration: 1.0,
      
                      // Can specify path transition in more detail, or remove it entirely
                      // pathTransition: 'none',
      
                      // Colors
                      pathColor: 'var(--bg-dark)',
                      textColor: 'var(--primary-button-bg)',
                      trailColor: '#E1E1E1',
                      backgroundColor: '#000',
                    })}
                  />
                );
              }}
            </VisibilitySensor>
          </div>
          <div className='os101_simpleQuiz_submit'><Button type="button" onClick={() => setTempGrade('hideTempGrade')} variant="primary">Try Again</Button></div>
        </div>
    </div>
  );
  
}

export default SimpleQuiz