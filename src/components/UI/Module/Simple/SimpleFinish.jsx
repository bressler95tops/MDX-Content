import { createElement } from 'react';
import {useParams} from 'react-router-dom';
import './Simple.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function SimpleFinish() {

  const params = useParams();
  let idParam = params.id;
  let lidParam = params.lid;
  let pass = '1234';

  const handleCopy = (e) => {
    let current_target = e.currentTarget;
    current_target.innerHTML = 'Successfully Copied!';
    navigator.clipboard.writeText(pass)

    setTimeout(function(){
        current_target.innerHTML = 'Copy Passcode';
    }, 3000);
  };
  
  return (
    <>
    <h1>Complete Open Science 101</h1>
    <p>To complete the Open Science 101 curriculum, you will need to follow the below steps.</p>
    <ul>
        <li><strong>Important:</strong> Copy the below <span style={{ color: 'red' }}>Passcode</span> to a safe place that you can refer to in the assesment portion of this course.</li>
    </ul>
    <InputGroup className="os101_copycode mb-3">
      <Form.Control aria-label="Passcode" value={pass} disabled/>
      <Button variant="primary" id="button-addon1" onClick={handleCopy}>
          Copy Passcode
      </Button>
    </InputGroup>
    <ul>
        <li>Close this window and find the assessment portion of this course.</li>
        <li>(Screenshot here)</li>
        <li>Open The assessment.</li>
        <li>Paste the Passcode into the designated box when taking the assessment.</li>
        <li>(Screenshot here)</li>
    </ul>
    </>
  )
  
}

export default SimpleFinish