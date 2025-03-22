
import { Children, useState, createContext, createElement } from 'react';
import './Tabs.css';

export const TabsContext = createContext();

function Tabs({children, activeIndex = 0}) {

  const [activeState, setActive] = useState(parseInt(activeIndex));

  let defaultTextVal = '';
  const defaultText = Children.map(children, (child, index) => {
    if(index == activeState) {
        return child.props.description;
    }
  });

  if(defaultText != null) {
    if(defaultText.length > 0) {
        defaultTextVal = defaultText[0];
    }
  }
  console.log(defaultTextVal);

  const [textState, setText] = useState(defaultTextVal);

  const checkActive = (e) => {
    let curValue = +e.currentTarget.dataset.tindex;
    let curDesc = e.currentTarget.dataset.desc;

    setActive(curValue);
    setText(curDesc);

  };

  return (
    <div className='tabsContainer'>
        <div className='tabsNavigation'>
            <TabsContext.Provider value={{ activeState, setActive, checkActive }}>
                {children}
            </TabsContext.Provider>
        </div>
        <div className="tabsContent">
            {textState}
        </div>
    </div>
  )
}

export default Tabs