import './ArrowButton.css';
import Slider from "react-slick";
import Button from 'react-bootstrap/Button';
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

function ArrowButton({title = 'Navigation Button', orientation = "left", disabled = false, onClick}) {

    let orientationClass = "";

    if(orientation == "left") {
      orientationClass = " left";
    } else if(orientation == "right") {
      orientationClass = " right";
    }
    
    return (
      <Button title={title} disabled={disabled} className={ "os101_simpleArrowButton" + orientationClass } onClick={onClick} variant="primary">{orientation == "left" ? <GoChevronLeft/> : orientation == "right" ? <GoChevronRight/> : <GoChevronLeft/> }</Button>
    );
}

export default ArrowButton