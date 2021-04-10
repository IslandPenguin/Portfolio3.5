import React, { Component } from "react";
import styles from "./education.scss";
import Div from "Common/components/div";
import { techList } from "Constants/techConstants";
import find from "lodash/find";
import { Transition, Spring } from "react-spring/renderprops";
import { random, parseNewLine } from "Common/utils";
import { getImagePosition, getBackgroundTransition } from './education_helper';
import techDoodleImage from "Images/favicon2.png";
import techDoodleImage1 from "Images/island-logo-rest.png";
import {Zoom} from "react-awesome-reveal";

class Education extends Component {
  constructor(props) {
    super(props);
    this.isFirstAnimation = true;
    const selectedTechId = 'react';
    const imageAlignment = random(0, 4);
    const imagePosition = getImagePosition(selectedTechId, imageAlignment);
    const backgroundTransition = getBackgroundTransition(
      selectedTechId,
      imageAlignment,
      this.isFirstAnimation
    );

    this.state = {
      selectedTechId,
      techTransitionAnimation: {
        react: {
          ...backgroundTransition,
          imagePosition
        }
      }
    }
  }

  componentDidMount() {
    this.isFirstAnimation = false;
  }

  onTechSelected = ({ selectedId }) => {
    const { techTransitionAnimation } = this.state;

    const imageAlignment = random(0, 3);
    const imagePosition = getImagePosition(selectedId, imageAlignment);
    const backgroundTransition = getBackgroundTransition(
      selectedId,
      imageAlignment,
      this.isFirstAnimation,
    );

    this.setState({
      selectedTechId: selectedId, techTransitionAnimation: {
        ...techTransitionAnimation,
        [selectedId]: {
          ...backgroundTransition,
          imagePosition
        }
      }
    });
  };

  render() {
    const { selectedTechId, techTransitionAnimation } = this.state;

    const tech = find(techList, techItem => {
      return techItem.id == selectedTechId;
    });

    return (
      <Div row fillParent align="stretch" className={styles.timeline_container}>
        <img src={techDoodleImage} className={styles.background_static_image}/>
      
     

        <Div className={styles.left_container}>
          <Transition
            items={tech}
            keys={tech => tech.id}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {tech => props => (
              <Div style={props} className={styles.content_container}>
                <div style={{color: "orange", fontWeight: "bold"}} className={styles.title}>Certificates:</div>
                <Div align="Right" className={styles.description_container}>
                  <div style={{color: "orange"}} className={styles.description}>    
                  <Zoom>
                <center> <p>CompTIA</p> </center>
                 <p><a href="https://www.comptia.org/certifications/network"target="_blank">Network+</a></p>
                 <a href="https://www.comptia.org/certifications/pentest"target="_blank">Pentest+</a>
                 <a href="https://www.comptia.org/certifications/security"target="_blank">Security+</a>
                 </Zoom>
                 <Zoom delay={1000}>
                 <center> <p>AWS </p></center>
               <a href="https://aws.amazon.com/certification/certified-solutions-architect-associate/"target="_blank">Solutions Architect </a>
               
                </Zoom>
                <Zoom delay={2000}>
                <p></p>
                </Zoom>
                </div>  
             <img src={techDoodleImage1} className={styles.background_static_image}/>          
                </Div>
              </Div>
            )}
          </Transition>
        </Div>
      </Div>
    );
  }
}

export default Education;