import './SimpleSlider.css';
import './MultiSlider.css';
import Slider from "react-slick";
import ArrowButton from '../ArrowButton/ArrowButton.jsx';

function MultiSlider({children, infinite = true}) {

    var settings = {
        arrows: true,
        dots: true,
        infinite: infinite,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <ArrowButton title="Previous Question" orientation = "right" />,
        prevArrow: <ArrowButton title="Previous Question" orientation = "left" />,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                arrows: true,
                dots: true,
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                dots: true,
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };
    
    return (
        <div className="os101_simpleSlider os101_multiSlider">
          <div className="os101_simpleSlider_inner">
            <Slider {...settings}>
              {children}
            </Slider>
          </div>
        </div>
    );
}

export default MultiSlider