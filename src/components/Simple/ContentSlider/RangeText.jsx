import { useContext } from 'react';
import { rangeContext } from './Range';

function RangeText({title, index, hide = false}) {
    const [rangeTextLength, rangeValue, activeColor] = useContext(rangeContext);
    const rangeWidth = "calc(100%" + "/" + rangeTextLength + " - 5px)";

    let classes = "os101_simpleContentSlider_rangeTextinner";

    if(index + 1 <= rangeValue) {
        classes = classes + " show";
    } else {
        classes = "os101_simpleContentSlider_rangeTextinner";
    }

    return (
        <div style={{width: rangeWidth}} className='os101_simpleContentSlider_rangeText'>
            <div style={{ backgroundColor: index + 1 == rangeValue ? activeColor : "#E1E1E1"}} className={classes}>{title}</div>
        </div>
    );
}

export default RangeText;