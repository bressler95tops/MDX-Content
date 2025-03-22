import { useContext } from 'react';
import './MultipleChoice.css';
import Button from 'react-bootstrap/Button';
import { multipleChoiceContext } from './MultipleChoice';

function MultipleAnswer({text = 'This is a unique answer.', id = '', isAnswer='false'}) {

  const [slug, handleChoices, choices] = useContext(multipleChoiceContext);
  let uniqueId = slug + '-' + id;

  return (
    <div className='os101_simpleMultipleAnswer'>
    <input name={slug} type='checkbox' id={uniqueId} value={uniqueId} onChange={handleChoices}/>
    <label htmlFor={uniqueId}>{text}</label>
    </div>
  );
  
}

export default MultipleAnswer