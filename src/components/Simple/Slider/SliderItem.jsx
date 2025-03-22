import { Children, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import Button from 'react-bootstrap/Button';

function SliderItem({children, type = ''}) {
    let titleFlip = null;
    let contentFlip = null;
    let multiItemClass = "os101_simpleSlider_item";

    if(type == "multi") {
        multiItemClass = multiItemClass + " " + type;
    }

    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => {
        if(flipped == false) {
            setFlipped(true);
        } else if(flipped == true) {
            setFlipped(false);
        }
    };
    
    if(children.length > 1) {
        titleFlip = Children.map(children, (child, index) => {
            if(index == 0) {
                return child;
            }
        });

        contentFlip = Children.map(children, (child, index) => {
            if(index > 0) {
                return child;
            }
        });
    }

    return (
        <div className={multiItemClass}>{type == '' ? children : type == 'multi' ? <ReactCardFlip isFlipped={flipped} flipDirection="vertical"><div className="os101_multiSlider_holder"><div className="os101_multiSlider_front">{titleFlip}<Button title='Flip' onClick={() => handleFlip()} variant="primary">Flip</Button></div></div><div className="os101_multiSlider_holder"><div className="os101_multiSlider_back">{contentFlip}<Button title='Unflip' onClick={() => handleFlip()} variant="primary">Unflip</Button></div></div></ReactCardFlip> : children}</div>
    );
}

export default SliderItem