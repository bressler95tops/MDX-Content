import { useContext } from 'react';
import { TabsContext } from './Tabs';

function Tab({title, description, index = 0}) {
  const tabs = useContext(TabsContext);
  let activeState = tabs.activeState;
  let checkActive = tabs.checkActive;
  let tabChecked = 'tabUnchecked';

  if(activeState == index) {
    tabChecked = 'tabChecked';
    
  }

  return (
    <button className={'tabButton ' + tabChecked} data-tindex={index} data-desc={description} onClick={checkActive}>{title}</button>
  )
}

export default Tab