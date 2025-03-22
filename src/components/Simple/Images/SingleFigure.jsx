import './Images.css';

function SingleFigure({size = '', src = '', caption = '', link = '', alt = 'Image Figure'}) {

  let hasCaption = 'os101_simpleSingleFigure_imageContainer';

  if(caption != '') {
    hasCaption = 'os101_simpleSingleFigure_imageContainer hasCaption';
  }

  return (
    <div className={size == '' ? 'os101_simpleSingleFigure' : 'os101_simpleSingleFigure ' + size}>
        <div className={hasCaption}>
            <img src={src} alt={alt}/>
            {caption == '' && link == '' ? null : caption != '' && link == '' ? <div className='os101_simpleSingleFigure_captionContainer'><div className='os101_simpleSingleFigure_caption'>{caption}</div></div> : caption != '' && link != '' ? <div className='os101_simpleSingleFigure_captionContainer'><div className='os101_simpleSingleFigure_caption'>{caption}</div><div className='os101_simpleSingleFigure_link'><a target="_blank" className="btn btn-primary" role="button" href={link}>Link</a></div></div> : null}
            {link == '' ? null : <div className='os101_simpleSingleFigure_link'></div>}
        </div>
    </div>
  );
  
}

export default SingleFigure