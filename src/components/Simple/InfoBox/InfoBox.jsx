import './InfoBox.css';
import Alert from 'react-bootstrap/Alert';
import { GoInfo } from "react-icons/go";

function InfoBox({message='This is a default message.', source="", link=""}) {
    
    return (
      <Alert key='info' variant='info' className='os101_simpleInfoBox'>
        <GoInfo/> {message}
        {source != "" && link == "" ? <p>{source}</p> : source != "" && link != "" ? <p><a target="_blank" href={link}>{source}</a></p> : null}
      </Alert>
    );
}

export default InfoBox