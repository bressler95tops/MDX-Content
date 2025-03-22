import Toast from 'react-bootstrap/Toast';

function Notification({handleNotification, showNotification}) {
  console.log(showNotification)
  // if(showNotification[0] == true) {
  //   generatePDF(getTargetElement, options);
  // }

  return (
    <Toast bg='primary' show={showNotification[0]} onClose={handleNotification} >
        <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{showNotification[1]}</strong>
            <small>{showNotification[2]}</small>
        </Toast.Header>
        <Toast.Body className='text-white'>{showNotification[3]}</Toast.Body>
    </Toast>
  )
}

export default Notification