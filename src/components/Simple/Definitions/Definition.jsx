import Accordion from 'react-bootstrap/Accordion';

function Definition({children, title}) {

  return (
    <>
    <Accordion.Header>{title}</Accordion.Header>
    <Accordion.Body>
        {children}
    </Accordion.Body>
    </>
  );
  
}

export default Definition