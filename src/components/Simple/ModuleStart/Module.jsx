import Col from 'react-bootstrap/Col';
import { BsArrowRightCircleFill } from "react-icons/bs";

function Module({image, link, children}) {
    return ( 
        <Col className="os101_simpleModuleStart_module">
            <div className="os101_simpleModuleStart_inner">
                <a title="Module Link" className="os101_simpleModuleStart_image" style={{backgroundImage: image != null && image != '' ? `url(${image})` : null}} href={link} target="_blank"></a>
                <div className="os101_simpleModuleStart_content">
                    {children}
                    <a title="Module Link" href={link} target="_blank">Start Learning<BsArrowRightCircleFill /></a>
                </div>
            </div>
        </Col>
    );
}

export default Module;