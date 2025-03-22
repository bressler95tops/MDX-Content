import { lazy, Suspense, createElement } from 'react';
import {useParams} from 'react-router-dom';
import toc from '../../../toc.json';

import Module1 from '../../../content/Module1.mdx';
import Module2 from '../../../content/Module2.mdx';
import Module3 from '../../../content/Module3.mdx';
import Module4 from '../../../content/Module4.mdx';
import Module5 from '../../../content/Module5.mdx';

const modules = {
  1: Module1,
  2: Module2,
  3: Module3,
  4: Module4,
  5: Module5
}

function Module() {

  const params = useParams();
  let idParam = params.id;
  
  // TODO: Check this out- https://stackoverflow.com/questions/58785014/how-to-pass-string-into-react-router-dom-route-as-function
  return (
    toc.map((child) => {
      if(child.id === idParam) {

        return createElement(
          modules[child.id],
          { className: '' }
        );
      }
    })
  )
  
}

export default Module