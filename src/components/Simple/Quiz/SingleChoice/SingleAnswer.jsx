import { useContext } from 'react';
import './SingleChoice.css';
import Button from 'react-bootstrap/Button';
import { singleChoiceContext } from './SingleChoice';

function SingleAnswer({text = 'This is a unique answer.', id = ''}) {

  const [slug, handleAnswer, currentAnswer] = useContext(singleChoiceContext);
  let uniqueId = slug + '-' + id;

  return (
    <div className='os101_simpleSingleAnswer'>
    <input name={slug} type='radio' id={uniqueId} value={uniqueId} checked={currentAnswer == uniqueId} onChange={handleAnswer}/>
    <label htmlFor={uniqueId}>{text}</label>
    </div>
  );
  
}

export default SingleAnswer