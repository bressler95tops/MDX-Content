import { createContext, useState, useContext } from 'react';
import './MultipleChoice.css';
import { Children } from 'react';
import Form from 'react-bootstrap/Form';
import { quizContext } from '../SimpleQuiz';
import { GoCheckCircleFill } from "react-icons/go";

export const multipleChoiceContext = createContext();

function MultipleChoice({children, index = -1, question = 'Is this a unique question?', answers = ''}) {

  const slugify = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  let slug = slugify(question) + '-question';
  const initialChoices = Children.map(children, (child) => {
    let isAnswer = '';
    if(child.props.isAnswer == null) {
        isAnswer = 'false';
    } else {
        isAnswer = child.props.isAnswer;
    }
    let result = slug + '-' + child.props.id + '::' + 'false' + '::' + isAnswer;
    return result;
  });
  //console.log(initialChoices);
  const [choices, setChoices] = useState(initialChoices);
  const [correctChoices, setCorrectChoices] = useState([]);
  const [correct, handleCorrect, parent] = useContext(quizContext);

  const handleChoices = (e) => {
    let elementChecked = '';
    let elementVal = e.currentTarget.value;

    if(e.currentTarget.checked == true) {
        elementChecked = 'true';
    } else if(e.currentTarget.checked == false) {
        elementChecked = 'false';
    }

    // console.log(elementVal);
    // console.log(elementChecked);

    let choicesResult = choices.map((child, index) => {
        console.log(child);
        let splitChoice = child.split("::");
        let splitId = splitChoice[0];
        let splitVal = splitChoice[1];
        let splitIsAnswer = splitChoice[2];

        if(splitId == elementVal) {
            return splitId + "::" + elementChecked + "::" + splitIsAnswer;
        } else {
            return splitId + "::" + splitVal + "::" + splitIsAnswer;
        }

        // console.log(elementVal);
    });

    let correctChoices = choicesResult.map((child, index) => {
        let splitChoice = child.split("::");
        let splitId = splitChoice[0];
        let splitVal = splitChoice[1];
        let splitIsAnswer = splitChoice[2];

        if(splitVal == 'true' && splitIsAnswer=='true') {
            return 'true';
        } else if(splitVal == 'false' && splitIsAnswer=='false') {
            return 'true';
        } else {
            return 'false';
        }
        
    });

    let correctCount = 0;
    for(let i = 0; i < correctChoices.length; i++) {
        let currentChoice = correctChoices[i];
        if(currentChoice == 'true') {
            correctCount += 1;
        }
    }

    console.log(choicesResult);
    console.log(correctCount + "/" + correctChoices.length);

    if(correctCount == correctChoices.length) {
        handleCorrect(index, 'true');
    } else {
        handleCorrect(index, 'false');
    }

    setChoices(choicesResult);
  };

  return (
    <div id={slug} className='os101_simpleMultipleChoice' data-index={index}>
        <h3>{question}</h3>
        <p>Select all that apply.</p>
        <Form>
          <multipleChoiceContext.Provider value={[slug, handleChoices, choices]}>
          {children}
          </multipleChoiceContext.Provider>
         </Form>

        {correct[index].split('::')[1] == 'true' ? <span className='os101_simpleQuiz_questionStat' style={{backgroundColor: 'green', color: 'white'}}><GoCheckCircleFill /> Correct</span> : null}
    </div>
  );
  
}

export default MultipleChoice