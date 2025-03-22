import './SimpleSlider.css';
import Slider from "react-slick";
import ArrowButton from '../ArrowButton/ArrowButton.jsx';

function SimpleSlider({children, align=""}) {

  let sliderClasses = "os101_simpleSlider singleSlider";

  if(align == "center") {
    sliderClasses = sliderClasses + " " + align;
  }

    var settings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        nextArrow: <ArrowButton title="Previous Question" orientation = "right" />,
        prevArrow: <ArrowButton title="Previous Question" orientation = "left" />,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                arrows: true,
                dots: true
              }
            },
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                dots: true
              }
            }
          ]
    };
    
    return (
        <div className={sliderClasses}>
          <div className="os101_simpleSlider_inner">
            <Slider {...settings}>
              {children}
            </Slider>
          </div>
        </div>
    );
}

export default SimpleSlider