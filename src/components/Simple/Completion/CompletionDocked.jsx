import './Completion.css';
import { useContext } from 'react';
import { modeContext } from '../../../App';
import {useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function CompletionDocked() {
  const [courseMode, handleCompletion, completion, handleLessonCompletion, lessonCompletion] = useContext(modeContext);

  const params = useParams();
  let idParam = params.id;
  let lidParam = params.lid;
  let newLid;
  let doit = false;
  let disabled = false;

  if(idParam != null && lidParam != null) {
    doit = true;
    newLid = lidParam;

    if(completion[idParam - 1][lidParam].status == true) {
      disabled = true;
    }

  } else if(idParam != null && lidParam == null) {
    doit = true;
    
    newLid = completion[idParam - 1][0].id;

    if(completion[idParam - 1][0].status == true) {
      disabled = true;
    }
  }

  return (
    <div className="os101_CompletionDocked">
        <Button disabled={disabled} onClick={() => {doit == true ? handleCompletion(idParam, newLid) : null}} variant="primary">Complete Lesson</Button>
    </div>
  );
  
}

export default CompletionDocked