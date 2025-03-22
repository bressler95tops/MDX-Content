import './Resources.css';
import Button from 'react-bootstrap/Button';

function Resource({title, buttonTitle = 'Click to Learn', link = 'https://example.com'}) {

  return (
    <div className='os101_simpleResource'>
        <div className='os101_simpleResource_column'><strong>{title}</strong></div>
        <div className='os101_simpleResource_column'><Button href={link} target="_blank" title="Click to Open Link" variant="primary">{buttonTitle}</Button></div>
    </div>
  );
  
}

export default Resource