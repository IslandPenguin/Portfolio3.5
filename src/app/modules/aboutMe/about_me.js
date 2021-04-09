import React, { Component } from "react";
import styles from "./about_me.scss";
import Div from "Common/components/div";
import { techList } from "Constants/techConstants";
import find from "lodash/find";
import { Transition, Spring } from "react-spring/renderprops";
import { random, parseNewLine } from "Common/utils";
import { getImagePosition, getBackgroundTransition } from './about_me_helper';
import techDoodleImage from "Images/background/Aut.OptProject.png";

class AboutMe extends Component {
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
      <img src={techDoodleImage} className={styles.background_static_image} />
     

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
                <div style={{color: "orange", fontWeight: "bold"}} className={styles.title}>....A little bit about me</div>
                <Div align="start" className={styles.description_container}>
                  <div style={{color: "orange"}} className={styles.description}>
                    A product of Rio Piedras, Puerto Rico. My obsession with creating, designing , and testing was evident at a early age.
                    As a kid, I would use stock paper, tape and a unrelenting attitude to achieve what I envisioned. Then I met the computer.
                    I traded paper for code and haven't looked back since. Anything is possible with a processor, direction and a programming language.
                    
                    In my spare time I engage in Woodworking ( check out my work in the link below), Microcontrollers and playing with my dog Leo
                  </div>
                <div style={{color: "orange", fontWeight: "bold"}} className={styles.title}>Enjoy your stay!</div>
                  <div style={{color: "orange"}} className={styles.description}>
                    "One day I will find the words and they will be simple - Jack Keruoac" </div>
                
                    <a href="https://imgur.com/a/OWyopEb">WoodWorking Hobby</a>
                    <a href="https://www.hackerone.com">Bug bounties I compete in</a>
                    <a href="https://www.twitch.tv/islandpenguin">Code streaming channel</a>
                    <a href="https://imgur.com/a/vBgP9Ix">Leo The Best Dog</a>
                    
                </Div>
              </Div>
            )}
          </Transition>
        </Div>
      </Div>
    );
  }
}

export default AboutMe;