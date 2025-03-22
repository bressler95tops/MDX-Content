import { Children, useContext } from 'react';
import { UserContext } from './Quiz';
import { QuestionContext } from './Question';

function Choice({title='This is a Choice', index = 0 }) {

  const user = useContext(UserContext);
  const question = useContext(QuestionContext);

  let questionindex = question.index;
  let checkAnswer = user.checkAnswer;
  let radioState = user.questionStates[questionindex].radio;

  if(radioState == index) {
    console.log('Choice Radio' + radioState);
    console.log('Choice Index' + index);
  }

  return (
    <div className={'choice_' + index}>
        <input type='radio' id={'radio_' + index} value={index} data-qid={questionindex} checked={radioState == index} onChange={checkAnswer}/>
        {title}
    </div>
  );
}

export default Choice