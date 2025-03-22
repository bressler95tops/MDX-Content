import { Children } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import './Definitions.css';

function Definitions({children}) {
  let accordion_items = Children.map(children, (child, index) => {

    return (<Accordion.Item eventKey={index.toString()}>
      {child}
    </Accordion.Item>);
  });

  return (
    <Accordion className='os101_simpleDefinitions' defaultActiveKey="0">
      { accordion_items }
    </Accordion>
  );
  
}

export default Definitions