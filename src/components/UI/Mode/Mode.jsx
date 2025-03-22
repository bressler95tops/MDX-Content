import { useContext } from 'react';
import { modeContext } from '../../../App';

function Mode({children, full = false, teacher= false, manager=false}) {

  const mode = useContext(modeContext);
  let modeState = mode.courseMode;
  let showMe = false;

  if(full == true && modeState == 'full') {
    showMe = true;
  }

  if(teacher == true && modeState == 'teacher') {
    showMe = true;
  }

  if(manager == true && modeState == 'manager') {
    showMe = true;
  }
  
  // TODO: Check this out- https://stackoverflow.com/questions/58785014/how-to-pass-string-into-react-router-dom-route-as-function
  return (
    <>
    { showMe == true ? children : '' }
    </>
  )
  
}

export default Mode