import Form from 'react-bootstrap/Form';
import { Children, useState, createContext, cloneElement } from 'react';

export const rangeContext = createContext();

function Range({children, beforeTitle = 'Range Before Title', afterTitle = 'Range After Title', activeColor="#F9F9F9"}) {

    const [rangeValue, setRangeValue] = useState(0);
    const handleRangeChange = (e) => {
        setRangeValue(e.target.value);
    };
    let rangeTextLength = children.length;

    const hexToRgb = (hex) => {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
          return r + r + g + g + b + b;
        });
      
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
    };

    let rgbColor = hexToRgb(activeColor);
    let rgbColorAlpha = activeColor;
    let rgbColorDark = activeColor;

    if(activeColor.startsWith('#')) {
        rgbColorAlpha = 'rgba(' + rgbColor.r + ',' + rgbColor.g + ',' + rgbColor.b + ',0.4)';
        
        if(rgbColor.r - 30 >= 0 && rgbColor.g - 30 >= 0 && rgbColor.b - 30 >= 0) {
            rgbColorDark = 'rgba(' + (rgbColor.r - 30) + ',' + (rgbColor.g - 30) + ',' + (rgbColor.b - 30) + ',1.0)';
        }
    }

    return (  
        <div className='os101_simpleContentSlider_range'>
            <div className='os101_simpleContentSlider_rangeControls'>
                
                <div style={{ '--rangeColor': activeColor, '--rangeColorAlpha': rgbColorAlpha, '--rangeColorDark': rgbColorDark }} className='os101_simpleContentSlider_rangeSlider'>
                    <rangeContext.Provider value={[rangeTextLength, rangeValue, activeColor]}>
                        <div className='os101_simpleContentSlider_rangeTextContainer'>{Children.map(children, (child, index) => { return cloneElement(child, {index: index}) })}</div>
                    </rangeContext.Provider>
                    <Form.Range min={0} max={rangeTextLength} step={1} value={rangeValue} onChange={handleRangeChange}/>
                    
                </div>
                <div className='os101_simpleContentSlider_rangelabels'>
                    <Form.Label>{beforeTitle}</Form.Label>
                    <Form.Label>{afterTitle}</Form.Label>
                </div>
            </div>
        </div>
    );
}

export default Range;