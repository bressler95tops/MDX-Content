import { Children } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import './CustomTabs.css';

function CustomTabs({children}) {

  let defKey = '';
  const extractedChildren = Children.map(children, (child) => {
    return child.props.eventKey;
  });

  if(extractedChildren != null && extractedChildren.length > 0) {
    defKey = extractedChildren[0];
    //console.log('Default Key: ' + defKey);
  }

  return (
    <div className='os101_simpleTabs'>
      <Tabs defaultActiveKey={defKey}>
        { children }
      </Tabs>
    </div>
  );
  
}

export default CustomTabs