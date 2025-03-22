import { BiArrowBack } from "react-icons/bi";
import { GoSidebarExpand, GoSidebarCollapse, GoScreenFull, GoScreenNormal, GoBriefcase, GoRocket, GoDownload, GoChevronLeft, GoChevronRight } from "react-icons/go";
import { PiGraduationCap } from "react-icons/pi";
import Button from 'react-bootstrap/Button';
import './TopBar.css';

function TopBar({handleHide, handleFullScreen, handleNotification, sidebarShow, isFullScreen}) {

  let contentClasses = 'os101TopBar';

  if(sidebarShow == false) {
    contentClasses = contentClasses + ' ' + 'hide';
  }

  return (
    <div className={contentClasses}>
      <div className='os101Toggle_container'>
        <Button onClick={handleHide} className='btn btn-primary'>{sidebarShow == true ? <GoSidebarExpand /> : <GoSidebarCollapse />}</Button>
        <Button onClick={handleFullScreen} variant="secondary">{isFullScreen == true ? <GoScreenNormal /> : <GoScreenFull />}</Button>
        <Button onClick={handleNotification} variant="secondary" data-title='Downloading...' data-status='Current Content' data-body='Your content is being downloaded by your browser...'><GoDownload /></Button>
      </div>
      <div className='os101TopNav_container'>
        
      </div>
    </div>
  )
}

export default TopBar