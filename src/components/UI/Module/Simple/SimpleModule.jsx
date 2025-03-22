import { createElement } from 'react';
import {useParams} from 'react-router-dom';
import toc from '../../../../toc.json';
import './Simple.css';

import Module1 from '../../../../content/clone/Module_1/readme.mdx';
import Module2 from '../../../../content/clone/Module_2/readme.mdx';
import Module3 from '../../../../content/clone/Module_3/readme.mdx';
import Module4 from '../../../../content/clone/Module_4/readme.mdx';
import Module5 from '../../../../content/clone/Module_5/readme.mdx';
import Module6 from '../../../../content/clone/README.mdx';

import Banner from '../../../../components/Simple/Banner.jsx';
import Definitions from '../../../../components/Simple/Definitions/Definitions.jsx';
import Definition from '../../../../components/Simple/Definitions/Definition.jsx';
import SimpleFinish from './SimpleFinish';
import Table from 'react-bootstrap/Table';
import SimpleQuiz from '../../../Simple/Quiz/SimpleQuiz.jsx';
import SingleChoice from '../../../Simple/Quiz/SingleChoice/SingleChoice.jsx';
import SingleAnswer from '../../../Simple/Quiz/SingleChoice/SingleAnswer.jsx';
import MultipleChoice from '../../../Simple/Quiz/MultipleChoice/MultipleChoice.jsx';
import MultipleAnswer from '../../../Simple/Quiz/MultipleChoice/MultipleAnswer.jsx';
import Match from '../../../Simple/Quiz/Match/Match.jsx';
import Matchable from '../../../Simple/Quiz/Match/Matchable.jsx';
import MultipleMatch from '../../../Simple/Quiz/MultipleMatch/MultipleMatch.jsx';
import MultipleMatchable from '../../../Simple/Quiz/MultipleMatch/MultipleMatchable.jsx';
import FillBlank from '../../../Simple/Quiz/FillBlank/FillBlank.jsx';
import Blank from '../../../Simple/Quiz/FillBlank/Blank.jsx';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import LearnButton from '../../../../components/Simple/LearnButton/LearnButton.jsx';
import CustomTabs from '../../../../components/Simple/CustomTabs/CustomTabs.jsx';
import CompletionDocked from '../../../../components/Simple/Completion/CompletionDocked.jsx';
import QuoteImage from '../../../../components/Simple/Images/QuoteImage.jsx';
import SingleFigure from '../../../../components/Simple/Images/SingleFigure.jsx';
import DoubleFigure from '../../../../components/Simple/Images/DoubleFigure.jsx';
import TripleFigure from '../../../../components/Simple/Images/TripleFigure.jsx';
import SimpleSlider from '../../../../components/Simple/Slider/SimpleSlider.jsx';
import MultiSlider from '../../../../components/Simple/Slider/MultiSlider.jsx';
import SliderItem from '../../../../components/Simple/Slider/SliderItem.jsx';
import Youtube from '../../../../components/Simple/Video/Youtube.jsx';
import InfoBox from '../../../../components/Simple/InfoBox/InfoBox.jsx';
import Resources from '../../../../components/Simple/Resources/Resources.jsx';
import Resource from '../../../../components/Simple/Resources/Resource.jsx';
import ModuleStart from '../../../../components/Simple/ModuleStart/ModuleStart.jsx';
import Module from '../../../../components/Simple/ModuleStart/Module.jsx';
import ContentSlider from '../../../../components/Simple/ContentSlider/ContentSlider.jsx';
import Range from '../../../../components/Simple/ContentSlider/Range.jsx';
import RangeText from '../../../../components/Simple/ContentSlider/RangeText.jsx';
import SpectrumImage from '../../../../components/Simple/Images/SpectrumImage/SpectrumImage.jsx';
import SpectrumDot from '../../../../components/Simple/Images/SpectrumImage/SpectrumDot.jsx';

const modules = {
  1: Module1,
  2: Module2,
  3: Module3,
  4: Module4,
  5: Module5,
  6: Module6
}

function SimpleModule() {

  const params = useParams();
  let idParam = params.id;
  
  return (
    toc.map((child) => {
      if(child.id === idParam) {

        return createElement(
          modules[child.id],
          { className: '', components: {Banner, Definitions, Definition, Table, SimpleQuiz, SingleChoice, SingleAnswer, MultipleChoice, MultipleAnswer, Match, Matchable, MultipleMatch, MultipleMatchable, FillBlank, Blank, Tab, Button, LearnButton, CustomTabs, CompletionDocked, QuoteImage, SingleFigure, DoubleFigure, TripleFigure, SimpleSlider, MultiSlider, SliderItem, Youtube, InfoBox, Resources, Resource, ModuleStart, Module, ContentSlider, Range, RangeText, SpectrumImage, SpectrumDot } }
        );
      }
    })
  )
  
}

export default SimpleModule