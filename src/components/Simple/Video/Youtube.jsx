import './Video.css';
import Ratio from 'react-bootstrap/Ratio';

function Youtube({embedUrl = 'https://www.youtube.com/embed/u31qwQUeGuM?si=2owDw3ex8A2U3Nxv'}) {
    
    return (
      <div className='os101_simpleYoutube'>
        <Ratio aspectRatio="16x9">
            <iframe width="560" height="315" src={embedUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </Ratio>
      </div>
    );
}

export default Youtube