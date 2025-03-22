import './Images.css';

function QuoteImage({quote = 'This is a Beautiful Default Quote', byWho = '', byWhoLink="", bgImage=''}) {
 // console.log(bgImage)
  return (
    <div className='os101_simpleQuoteImage' style={{ backgroundImage: "url(" + bgImage + ")" }}>
        <div className='os101_simpleQuoteImage_overlay'></div>
        <div className='os101_simpleQuoteImage_content'>
          <h4>
            {quote}
          </h4>
          {byWho == "" ? null : byWho != "" && byWhoLink == "" ? <p>{"-" + byWho}</p> : byWho != "" && byWhoLink != "" ? <p><a href={byWhoLink} target="_blank">{"-" + byWho}</a></p> : null}
        </div>
    </div>
  );
  
}

export default QuoteImage