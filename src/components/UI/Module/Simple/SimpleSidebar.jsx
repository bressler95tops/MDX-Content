import {Link, useParams} from 'react-router-dom';
import toc from '../../../../toc.json';
import { useContext } from 'react';
import { modeContext } from '../../../../App';
import './Simple.css';

function SimpleSidebar({content}) {

  //console.log(content)
  const [courseMode, handleCompletion, completion, handleLessonCompletion, lessonCompletion, handleSaveDom, savedDom, unparsedDom] = useContext(modeContext);

  const params = useParams();
  let idParam = params.id;
  let lidParam = params.lid;
  let lesson_data = [];
  let contentList = [];

  if(content != null && content != 0) {
      contentList = content.map((child, index) => {
        if(lidParam != null) {
          let lesson_complete_class = '';

          if(lessonCompletion != null) {
            for(let i = 0; i < lessonCompletion.length; i++) {
              let current_lCompletion = lessonCompletion[i];
  
              if(current_lCompletion.module == idParam && current_lCompletion.lesson == lidParam && current_lCompletion.hid == child[1]) {
                lesson_complete_class = 'complete';
              }
            }
          }

          return <li className={lesson_complete_class} key={index}><Link to={'/Simple/' + idParam + '/' + lidParam + '/#' + child[1]}><span className="os101Simple_ProgressIndicator"></span>{truncateString(child[0], 50)}</Link></li>
        } else {
          let lesson_complete_class = '';
          
          if(lessonCompletion != null) {
            for(let i = 0; i < lessonCompletion.length; i++) {
              let current_lCompletion = lessonCompletion[i];
  
              if(current_lCompletion.module == idParam && current_lCompletion.hid == child[1]) {
                lesson_complete_class = 'complete';
              }
            }
          }
          
          return <li className={lesson_complete_class} key={index}><Link to={'/Simple/' + idParam + '/#' + child[1]}><span className="os101Simple_ProgressIndicator"></span>{truncateString(child[0], 50)}</Link></li>
        }
        
      });

      // console.log("Content List:" + contentList);
  }

  let searchModules = toc.filter((child, i) => {
    return child.id == params.id;
  }).map((child) => {
    return child.lessons;
  });

  

  if(searchModules != null && searchModules.length == 1) {

    for (let key in searchModules[0]) {
      if (searchModules[0].hasOwnProperty(key)) {
        let lesson_id = searchModules[0][key].id;
        let lesson_name = searchModules[0][key].name;
        lesson_data.push([lesson_id, lesson_name]);
      }
    }

  }

  // console.log(lesson_data);

  // console.log(lidParam);

  if(lesson_data.length <= 0) {
    return '';
  } else {
    
    return (<div className='os101SimpleSideBar'>
      <div className='os101SimpleLogo'><img src='./images/logo.png'/></div>
      <div className="os101SimpleSideBar_navigation">
      <h2>All Content</h2>
      <ul>
          {
            lesson_data.map((child, index) => {
              let complete_class = '';

              if(completion != null) {
                if(completion[idParam - 1] != null & completion[idParam - 1].length > 0) {
                  let module_progress = completion[idParam - 1];

                  for(let i = 0; i < module_progress.length; i++) {
                    let current_lesson = module_progress[i];
                    let current_lesson_id = current_lesson.id;
                    let current_lesson_status = current_lesson.status;

                    if(child[0] == current_lesson_id && current_lesson_status == true) {
                      complete_class = ' complete';
                      console.log(child[0] + ', ' + current_lesson_id);
                    }

                  }
                }
                
              }

              if(child[0] == 'welcome') {
                return <li className={idParam != null && lidParam == null ? 'active' + complete_class : complete_class.replace(' ', '')} key={index}><Link to={'/Simple/' + idParam}><span className="os101Simple_ProgressIndicator"></span>{child[1]}</Link></li>
              } else {
                return <li className={idParam != null && lidParam != null && lidParam == child[0] ? 'active' + complete_class : complete_class.replace(' ', '')} key={index}><Link to={'/Simple/' + idParam + '/' + child[0]}><span className="os101Simple_ProgressIndicator"></span>{child[1]}</Link></li>
              }
              
            })
          }

      </ul>
      <h2>Navigation</h2>
      {contentList != null && contentList.length > 0 ? <ul>{contentList}</ul> : <p>Nothing to navigate :)</p>}
      </div>
    </div>);
    
  }
  
}

function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

export default SimpleSidebar