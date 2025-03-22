import { createElement } from 'react';
import {useParams} from 'react-router-dom';
import toc from '../../../../toc.json';
import './Simple.css';

import M1Lesson1 from '../../../../content/clone/Module_1/Lesson_1/readme.mdx';
import M2Lesson1 from '../../../../content/clone/Module_2/Lesson_1/readme.mdx';
import M3Lesson1 from '../../../../content/clone/Module_3/Lesson_1/readme.mdx';
import M4Lesson1 from '../../../../content/clone/Module_4/Lesson_1/readme.mdx';
import M5Lesson1 from '../../../../content/clone/Module_5/Lesson_1/readme.mdx';

import M1Lesson2 from '../../../../content/clone/Module_1/Lesson_2/readme.mdx';
import M2Lesson2 from '../../../../content/clone/Module_2/Lesson_2/readme.mdx';
import M3Lesson2 from '../../../../content/clone/Module_3/Lesson_2/readme.mdx';
import M4Lesson2 from '../../../../content/clone/Module_4/Lesson_2/readme.mdx';
import M5Lesson2 from '../../../../content/clone/Module_5/Lesson_2/readme.mdx';

import M1Lesson3 from '../../../../content/clone/Module_1/Lesson_3/readme.mdx';
import M2Lesson3 from '../../../../content/clone/Module_2/Lesson_3/readme.mdx';
import M3Lesson3 from '../../../../content/clone/Module_3/Lesson_3/readme.mdx';
import M4Lesson3 from '../../../../content/clone/Module_4/Lesson_3/readme.mdx';
import M5Lesson3 from '../../../../content/clone/Module_5/Lesson_3/readme.mdx';

import M1Lesson4 from '../../../../content/clone/Module_1/Lesson_4/readme.mdx';
import M2Lesson4 from '../../../../content/clone/Module_2/Lesson_4/readme.mdx';
import M3Lesson4 from '../../../../content/clone/Module_3/Lesson_4/readme.mdx';
import M4Lesson4 from '../../../../content/clone/Module_4/Lesson_4/readme.mdx';
import M5Lesson4 from '../../../../content/clone/Module_5/Lesson_4/readme.mdx';

import M1Lesson5 from '../../../../content/clone/Module_1/Lesson_5/readme.mdx';
import M2Lesson5 from '../../../../content/clone/Module_2/Lesson_5/readme.mdx';
import M3Lesson5 from '../../../../content/clone/Module_3/Lesson_5/readme.mdx';
import M4Lesson5 from '../../../../content/clone/Module_4/Lesson_5/readme.mdx';
import M5Lesson5 from '../../../../content/clone/Module_5/Lesson_5/readme.mdx';

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

const m1lessons = {
  1: M1Lesson1,
  2: M1Lesson2,
  3: M1Lesson3,
  4: M1Lesson4,
  5: M1Lesson5
}

const m2lessons = {
  1: M2Lesson1,
  2: M2Lesson2,
  3: M2Lesson3,
  4: M2Lesson4,
  5: M2Lesson5
}

const m3lessons = {
  1: M3Lesson1,
  2: M3Lesson2,
  3: M3Lesson3,
  4: M3Lesson4,
  5: M3Lesson5
}

const m4lessons = {
  1: M4Lesson1,
  2: M4Lesson2,
  3: M4Lesson3,
  4: M4Lesson4,
  5: M4Lesson5
}

const m5lessons = {
  1: M5Lesson1,
  2: M5Lesson2,
  3: M5Lesson3,
  4: M5Lesson4,
  5: M5Lesson5
}

function SimpleLesson() {

  const params = useParams();
  let idParam = params.id;
  let lidParam = params.lid;
  
  return (
    toc.map((child) => {
      if(child.id === idParam) {
        const child_lessons = child.lessons;

        // console.log(child_lessons);

        for (let lesson in child_lessons) {
          if (child_lessons.hasOwnProperty(lesson)) {
            let lesson_id = child_lessons[lesson].id;
            
            if(lesson_id === lidParam) {
              if(lidParam == "Complete") {
                return <SimpleFinish/>;
              } else {
                let lessontouse;

                if(idParam == 1) {
                  lessontouse = m1lessons;
                } else if(idParam == 2) {
                  lessontouse = m2lessons;
                } else if(idParam == 3) {
                  lessontouse = m3lessons;
                } else if(idParam == 4) {
                  lessontouse = m4lessons;
                } else if(idParam == 5) {
                  lessontouse = m5lessons;
                }

                return createElement(
                  lessontouse[lesson_id],
                    { className: '', components: {Banner, Definitions, Definition, Table, SimpleQuiz, SingleChoice, SingleAnswer, MultipleChoice, MultipleAnswer, Match, Matchable, MultipleMatch, MultipleMatchable, FillBlank, Blank, Tab, Button, LearnButton, CustomTabs, CompletionDocked, QuoteImage, SingleFigure, DoubleFigure, TripleFigure, SimpleSlider, MultiSlider, SliderItem, Youtube, InfoBox, Resources, Resource, ModuleStart, Module, ContentSlider, Range, RangeText, SpectrumImage, SpectrumDot } }
                  );
              }
            }
          }
        }

        return 'No Lesson Found';
      }
    })
  )
  
}

export default SimpleLesson