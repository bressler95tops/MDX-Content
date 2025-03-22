import './Banner.css';

function Banner({title = 'Default Title', subTitle = 'Default subtitle, this is a longer sentence.', bgImage='', bgColor='#000000', opacity='0.5'}) {
 console.log(bgImage)
  return (
    <div className='os101_simpleBanner' style={{ backgroundImage: "url(" + bgImage + ")" }}>
        <div style={{ backgroundColor: bgColor, opacity: opacity }} className='os101_simpleBanner_overlay'></div>
        <div className='os101_simpleBanner_container'>
            <h1>{title}</h1>
            <p>{subTitle}</p>
        </div>
    </div>
  );
  
}

export default Banner