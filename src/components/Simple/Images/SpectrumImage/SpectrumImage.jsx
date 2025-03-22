import { Children, useState, createContext, cloneElement } from 'react';
import './SpectrumImage.css';

export const spectrumContext = createContext();

function SpectrumImage({children, src = '', alt=''}) {
    const initialTextOpen = Children.map(children, () => {
        return false;
    });
    const [textOpen, setTextOpen] = useState(initialTextOpen);
    const handleTextOpen = (target, value) => {
        const changed = textOpen.map((child, index) => {
            if(index == target) {
                if(value == true) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        });

        setTextOpen(changed);
    };

    return (  
        <div className='os101_simpleSpectrumImage'>
            <div className='os101_simpleSpectrumImage_container'>
                <img src={src} alt={alt}/>
                <spectrumContext.Provider value={[textOpen, handleTextOpen]}>
                    {Children.map(children, (child, index) => { return cloneElement(child, {index: index}) })}
                </spectrumContext.Provider>
            </div>
        </div>
    );
}

export default SpectrumImage;