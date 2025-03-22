import { createContext, useState, useContext } from 'react';
import { fillBlankContext } from './FillBlank';

function Blank({children}) {

  const [handleCheck, answer] = useContext(fillBlankContext);

  return (
    <input type="text" placeholder="Type Your Answer" onChange={handleCheck}></input>
  );
  
}

export default Blank