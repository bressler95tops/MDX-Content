import { useState, useEffect, Children, createContext } from 'react';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import './App.css';
import Module from './components/UI/Module/Module';
import SimpleModule from './components/UI/Module/Simple/SimpleModule';
import SimpleLesson from './components/UI/Module/Simple/SimpleLesson';
import Sidebar from './components/UI/Sidebar/Sidebar';
import Content from './components/UI/Content/Content';
import TopBar from './components/UI/TopBar/TopBar';
import Notification from './components/UI/Notification/Notification';
import ScrollToAnchor from './components/UI/ScrollToAnchor/ScrollToAnchor.jsx';
import {HashRouter, Route, Routes, Link} from 'react-router-dom';
import toc from './toc.json';

export const modeContext = createContext();

const options = {
  filename: 'currentModule.pdf',
  page: {
    // margin is in MM, default is Margin.NONE = 0
    margin: Margin.NONE,
    // default is 'A4'
    format: 'letter',
    // default is 'portrait'
    orientation: 'landscape',
 },
};

const getTargetElement = () => document.getElementById('os101Content_container');

function App() {

  const initialCompletion = toc.map((child) => {
    const lessons = child.lessons;
    const lessonCompletion = lessons.map((child_two) => {
      return {id: child_two.id, status: false};
    });

    return lessonCompletion;

  });

  const initialSavedDom = toc.map((child) => {
    const lessons = child.lessons;
    const lessonCompletion = lessons.map((child_two) => {
      return {id: child_two.id, elements: []};
    });

    return lessonCompletion;

  });

  //console.log(initialCompletion);

  const [sidebarShow, setSidebarShow] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [courseMode, setCourseMode] = useState('full');
  const [showNotification, setShowNotication] = useState([false, '', '', '']);
  const [completion, setCompletion] = useState(initialCompletion);
  const [lessonCompletion, setLessonCompletion] = useState([]);
  const [parentInitalized, setParentInitalized] = useState(false);
  const [savedDom, setSavedDom] = useState(initialSavedDom);
  const [unparsedDom, setUnparsedDom] = useState("[os101-quiz]" + JSON.stringify(initialSavedDom));

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullScreen(Boolean(document.fullscreenElement));
    }

    function receiveMessage(event) {
      console.log("Receiving from parent: " + event.origin);
        if(event.origin !== "https://deploy-canvas.pages.dev" && event.origin !== "https://nasastem.instructure.com")
        return;
        
        if(event.data.includes("[os101-completion]")) {
          console.log(event.data);

          if(event.data == "[os101-completion]Empty") {
            setCompletion(initialCompletion);
          } else {
            let parsedData = JSON.parse(event.data.replace("[os101-completion]", ""));
            console.log(parsedData);
            setCompletion(parsedData);
          }
        } else if(event.data.includes("[os101-quiz]")) {
          console.log(event.data);

          if(event.data == "[os101-quiz]Empty") {
            setUnparsedDom("[os101-quiz]" + JSON.stringify(initialSavedDom));
            setSavedDom(initialSavedDom);
          } else {
            let parsedData = JSON.parse(event.data.replace("[os101-quiz]", ""));
            console.log(parsedData);
            setUnparsedDom(event.data);
            setSavedDom(parsedData);
          }
        }

    }
          
    document.addEventListener('fullscreenchange', onFullscreenChange);
    window.addEventListener('message', receiveMessage, false);

    if(parentInitalized == false) {
      window.parent.postMessage("[os101]initialized", "*");
      setParentInitalized(true);
    }
  
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange)
      window.removeEventListener('message', receiveMessage, false);
    };
  }, []);

  const handleFullScreen = () => {
    if(isFullScreen == false) {
      setIsFullScreen(true);
      setTimeout(function(){
        setSidebarShow(false)
      }, 500);
      document.body.requestFullscreen();
    } else {
      setIsFullScreen(false);
      document.exitFullscreen();
    }
  };

  const handleHide = () => {
    if(sidebarShow == true) {
      setSidebarShow(false);
    } else if(sidebarShow == false) {
      setSidebarShow(true);
    }
  };

  const handleCourseMode = (e) => {
    let curMode = e.currentTarget.dataset.mode;
    setCourseMode(curMode);
  };

  const handleNotification = (e) => {
    if(showNotification[0] == true) {
      setShowNotication([false, '', '', '']);
    } else if(showNotification[0] == false) {
      setShowNotication([true, e.currentTarget.dataset.title, e.currentTarget.dataset.status, e.currentTarget.dataset.body]);
      generatePDF(getTargetElement, options);
    }
    
  };

  const handleCompletion = (module, lesson) => {
    
    const changed = completion.map((child, index) => {

      const current_lesson = child.map((child_two, index_two) => {
        let lesson_id = child_two.id;
        let status = child_two.status;

        if((module - 1) == index && lesson == lesson_id) {
          status = true;
        }

        console.log(lesson)

        return {id: child_two.id, status: status};
      });
  
      return current_lesson;
  
    });

    console.log(changed);
    window.parent.postMessage("[os101-completion]" + JSON.stringify(changed), "*");
    setCompletion(changed);
  };

  const handleLessonCompletion = (module, lesson, hid) => {
    let result = {module: module, lesson: lesson, hid: hid};
    let match = false;
    // console.log(result);

    setLessonCompletion(lessonCompletion => [...lessonCompletion, result]);
    
  };

  const handleSaveDom = (module, lesson, qid, percentage) => {

    const changed = savedDom.map((child, index) => {

      const current_lesson = child.map((child_two, index_two) => {
        let lesson_id = child_two.id;
        let elements = child_two.elements;

        if((module - 1) == index && lesson == lesson_id) {

            let changed_elements = elements;
            const elementIndex = changed_elements.findIndex(el => el.qid === qid);
            if (elementIndex !== -1) {
              changed_elements[elementIndex].percentage = percentage;
            } else {
              changed_elements.push({qid: qid, percentage: percentage});
            }

            elements = changed_elements;
          
        }

        return {id: child_two.id, elements: elements};
      });
  
      return current_lesson;
  
    });

    console.log(changed);
    window.parent.postMessage("[os101-quiz]" + JSON.stringify(changed), "*");
    setSavedDom(changed);

  }

  return (
    
      <HashRouter basename='/'>
        <ScrollToAnchor/>
        <Routes>
            <Route exact path='/' element={
                <div className='app'>
                  <TopBar handleHide={handleHide} handleFullScreen={handleFullScreen} handleNotification={handleNotification} sidebarShow={sidebarShow} isFullScreen={isFullScreen}></TopBar>
                  <Sidebar handleCourseMode={handleCourseMode} courseMode={courseMode} show={sidebarShow}>
                  <ul>
                  {
                    toc.map((child, i) => {
                      return <li><Link to={'/Module/' + child.id}>{child.name}</Link></li>
                    })
                  }  
                  </ul>
                  </Sidebar>
                  <modeContext.Provider value={[courseMode, handleCompletion, completion, handleLessonCompletion, lessonCompletion, handleSaveDom, savedDom, unparsedDom]}>
                  <Content show={sidebarShow}/>
                  </modeContext.Provider>
                  <Notification handleNotification={handleNotification} showNotification={showNotification}/>
                </div>
            }>
            </Route>
            <Route path='/Module/:id' element={
                <div className='app'>
                  <TopBar handleHide={handleHide} handleFullScreen={handleFullScreen} handleCourseMode={handleCourseMode} handleNotification={handleNotification} sidebarShow={sidebarShow} isFullScreen={isFullScreen}></TopBar>
                  <Sidebar handleCourseMode={handleCourseMode} courseMode={courseMode} show={sidebarShow}>
                  <ul>
                  {
                   toc.map((child, i) => {
                    return <li><Link to={'/Module/' + child.id}>{child.name}</Link></li>
                  })
                  }  
                  </ul>
                  </Sidebar>
                  <modeContext.Provider value={[courseMode, handleCompletion, completion, handleLessonCompletion, lessonCompletion, handleSaveDom, savedDom, unparsedDom]}>
                  <Content show={sidebarShow}>
                    <Module/>
                  </Content>
                  </modeContext.Provider>
                  <Notification handleNotification={handleNotification} showNotification={showNotification}/>
                </div>
            }>
            </Route>
            <Route path='/Simple/:id' element={
              <modeContext.Provider value={[courseMode, handleCompletion, completion, handleLessonCompletion, lessonCompletion, handleSaveDom, savedDom, unparsedDom]}>
                <Content isSimple={true}>
                      <SimpleModule/>
                </Content>
              </modeContext.Provider>
            }></Route>
            <Route path='/Simple/:id/:lid' element={
              <modeContext.Provider value={[courseMode, handleCompletion, completion, handleLessonCompletion, lessonCompletion, handleSaveDom, savedDom, unparsedDom]}>
                <Content isSimple={true}>
                      <SimpleLesson/>
                </Content>
              </modeContext.Provider>
            }></Route>
             <Route path='/Canvas/:id' element={
              <modeContext.Provider value={[courseMode, handleCompletion, completion, handleLessonCompletion, lessonCompletion, handleSaveDom, savedDom, unparsedDom]}>
                <Content isCanvas={true}>
                      <SimpleModule/>
                </Content>
              </modeContext.Provider>
            }></Route>
            <Route path='/Canvas/:id/:lid' element={
              <modeContext.Provider value={[courseMode, handleCompletion, completion, handleLessonCompletion, lessonCompletion, handleSaveDom, savedDom, unparsedDom]}>
                <Content isCanvas={true}>
                      <SimpleLesson/>
                </Content>
              </modeContext.Provider>
            }></Route>
          
        </Routes>
      </HashRouter>
  
  )
}

export default App
