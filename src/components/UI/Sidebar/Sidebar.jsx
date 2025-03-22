import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import './Sidebar.css';

function Sidebar({children, show, handleCourseMode, courseMode}) {
  return (
    <div className={show == true ? 'os101Sidebar' : 'os101Sidebar hide'}>
      <div className='os101Logo p-2 px-4'>
        <img src='./images/logo.png'/>
        <div className='os101Logo_courseInfo'>
          <span>Open Science 101</span>
          <span>Development Version</span>
        </div>
      </div>
      <div className='os101Sidebar_content p-5 px-4'>
        {children}
      </div>
      <div className='os101Sidebar_bottom p-4 px-4'>
        <ToggleButtonGroup className='p-1' type="radio" name="options" defaultValue='full' value={courseMode}>
          <ToggleButton variant='secondary' onClick={handleCourseMode} data-mode='full' id="tbg-radio-1" value='full'>
            Full
          </ToggleButton>
          <ToggleButton variant='secondary' onClick={handleCourseMode} data-mode='teacher' id="tbg-radio-2" value='teacher'>
            Teacher
          </ToggleButton>
          <ToggleButton variant='secondary' onClick={handleCourseMode} data-mode='manager' id="tbg-radio-3" value='manager'>
            Executive
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  )
}

export default Sidebar