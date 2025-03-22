import './Images.css';
import SingleFigure from './SingleFigure.jsx';
import { Children, cloneElement } from 'react';

function TripleFigure({children, maxWidth="100%"}) {

  let clonedChildren = Children.map(children, (child) => {
    return cloneElement(child, {size: 'full'});
  });

  return (
    <div style={{maxWidth: maxWidth}} className='os101_simpleTripleFigure'>
    {clonedChildren.map((child) => {return <div className="os101_simpleTripleFigure_column">{child}</div>})}
    </div>
  );
  
}

export default TripleFigure