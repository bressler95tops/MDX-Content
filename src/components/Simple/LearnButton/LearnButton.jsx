import './LearnButton.css';
import Button from 'react-bootstrap/Button';

function LearnButton({href="https://example.com", text="Click to Learn"}) {
    
    return (
      <Button target="_blank" href={href} title={"Click to Learn button"} className="os101_simpleLearnMore" variant="primary">{text}</Button>
    );
}

export default LearnButton