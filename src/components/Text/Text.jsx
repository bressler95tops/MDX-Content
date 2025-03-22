import './Text.css';

function Text({children, id}) {
  return (
    <div id={id} className='textContainer slide p-5 px-4 px-md-5'>
      <div className='slideContent'>
      {children}
      </div>
    </div>
  )
}

export default Text