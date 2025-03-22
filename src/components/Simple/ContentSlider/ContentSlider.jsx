import './ContentSlider.css';

function ContentSlider({children, bgImage}) {
    return ( 
        <div className='os101_simpleContentSlider'>
            <div className='os101_simpleContentSlider_container' style={{backgroundImage: bgImage != null && bgImage != 'null' ? `url(${bgImage})` : null}}>
                {children}
            </div>
        </div>
    );
}

export default ContentSlider;