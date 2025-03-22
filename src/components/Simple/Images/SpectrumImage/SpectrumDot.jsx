import { useContext } from 'react';
import { spectrumContext } from './SpectrumImage';

function SpectrumDot({children, hPos = '0%', vPos = '0%', orientation='left', index}) {
    let classes = 'os101_simpleSpectrumDot';
    const [textOpen, handleTextOpen] = useContext(spectrumContext);

    if(orientation == 'left') {
        classes = classes + ' left';
    } else if (orientation == 'right') {
        classes = classes + ' right';
    }

    return (  
        <div style={{ left: hPos, top: vPos}} className={classes}>
            <button className='os101_simpleSpectrumButton' onClick={() => {textOpen[index] == true ? handleTextOpen(index, false) : handleTextOpen(index, true)}}>+</button>
            <div style={{visibility: textOpen[index] == false ? "hidden" : "visible", opacity: textOpen[index] == false ? "0" : "1", transform: textOpen[index] == false ? "scale(0.8)" : "scale(1.0)"}} className='os101_simpleSpectrumDot_text'>{children}</div>
        </div>
    );
}

export default SpectrumDot;