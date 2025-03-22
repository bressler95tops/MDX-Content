import { useRef, useState, useEffect, useContext } from 'react';
import {useParams} from 'react-router-dom';
import './Content.css';
import SimpleSidebar from '../Module/Simple/SimpleSidebar';
import { modeContext } from '../../../App';

function Content({children, isMinimal = false, isSimple = false, isCanvas = false, show}) {

  const params = useParams();
  let idParam = params.id;
  let lidParam = params.lid;
  let contentClasses = 'os101Content';

  const [courseMode, handleCompletion, completion, handleLessonCompletion, lessonCompletion, handleSaveDom, savedDom, unparsedDom] = useContext(modeContext);
  const contentRef = useRef(null);
  const [contentElements, setContentElements] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const applyObserver = (el) => {

    const observer = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // console.log('Element Viewed: ' + el.innerHTML + ", Element ID: " + el.id);
        handleLessonCompletion(idParam, lidParam, el.id);
        return
      }
      // console.log('LEAVE ' + el.innerHTML);
    }, {
      root: null,
      threshold: 0.5, // set offset 0.1 means trigger if atleast 10% of element in viewport
    })
  
    observer.observe(el);
  };

  useEffect(() => {
    let result = [];
    const elements = contentRef.current;
    let tables = elements.getElementsByTagName("table");
    let titles = elements.getElementsByTagName("h2");
    let links = elements.getElementsByTagName("a");
    let simpleContent_wrapper = document.getElementById("simpleContent_wrapper");;

    if(simpleContent_wrapper != null) {
      simpleContent_wrapper.scrollTop = 0;
    }

    if(titles != null) {
      for(let i = 0; i < titles.length; i++) {
        let current_title = titles[i].innerHTML;
        let current_slug = slugify(current_title);
        let current_class = titles[i].className;

        if(current_class != 'accordion-header') {
          titles[i].id = current_slug;
          result.push([current_title, current_slug, current_class]);
          applyObserver(titles[i]);
        }
        
      }
  
      setContentElements(result);
    } else {
      setContentElements(0);
    }

    // console.log("");
    // console.log("LINKS");

    if(links != null) {
      for(let i = 0; i < links.length; i++) {
        
        if(links[i].className == null || links[i].className == '') {
          links[i].target = "_blank";
          // console.log(links[i]);
        }
      }
    }

  }, [idParam, lidParam]);


  if(isMinimal == true) {
    contentClasses = contentClasses + ' ' + 'minimalContent';
  }

  if(isSimple == true) {
    contentClasses = contentClasses + ' ' + 'simpleContent';
  }

  if(isCanvas == true) {
    contentClasses = contentClasses + ' ' + 'simpleContent canvasContent';
  }

  if(show == false) {
    contentClasses = contentClasses + ' ' + 'hide';
  }

  let simpleRender = <><SimpleSidebar content={contentElements}/><div id="simpleContent_wrapper" className='simpleContent_wrapper'><div ref={contentRef} id='os101Content_container' className='os101Content_container'>{children}</div></div></>;
  let canvasRender = <><div id="simpleContent_wrapper" className='simpleContent_wrapper canvasContent_wrapper'><div ref={contentRef} id='os101Content_container' className='os101Content_container'>{children}</div></div></>;
  let miscRender = <div ref={contentRef} id='os101Content_container' className='os101Content_container'>{children}</div>;

  return (
    <div id='os101Content' className={contentClasses}>
      {isSimple == true ? simpleRender : isCanvas == true ? canvasRender : miscRender}
    </div>
  )
}

function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
           .replace(/\s+/g, '-') // replace spaces with hyphens
           .replace(/-+/g, '-'); // remove consecutive hyphens
  return str;
}

export default Content