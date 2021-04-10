import React, { Component, memo, useEffect, useState } from "react";
import { Transition, config } from "react-spring/renderprops";
import Div from "Common/components/div";
import styles from "./header_description.module.scss";
import ContactComponent from "Common/components/contactComponent";
import Flag from 'react-world-flags'

const HeaderDescription = ({
  showDescription,
  onClickProject,
  onClickTimeline,
  onClickAboutMe,
  onClickEducation,
  isFirstTime
}) => {

  return (
    <Transition
      items={showDescription}
      from={{
        opacity: 0,
        transform: "translateY(calc(50vh - 0px))"
      }}
      enter={{
        opacity: 1,
        transform: "translateY(calc(50vh - 145px))"
      }}
      leave={{
        opacity: 0
      }}
      config={isFirstTime ? { delay: 100 } : config.default}
    >
      {showDescription =>
        showDescription &&
        (props => (
          <Div style={props} className={styles.user_description_container}>
            <div className={styles.user_description}>
            <center>Hello! Hola!</center><b className={styles.name}><center>I am Yadiel Cordero Badillo</center></b>
            <p>An avid enthusiast of all things tech, a <b className={styles.name}>relentless</b> learner and above all a <b className={styles.name} >Problem Solver</b>. Welcome to my Portfolio!</p> 
              <center><Flag code="pr" height="16" /></center>
            </div>

            <Div row align className={styles.user_button_container}>
              Checkout my
              <Div
                align
                className={styles.user_button}
                onClick={onClickTimeline}
              >
                Timeline
                <Underline isFirstTime={isFirstTime} />
              </Div>
              and
              <Div
                align
                className={styles.user_button}
                onClick={onClickProject}
              >
                Technologies
                <Underline isFirstTime={isFirstTime} />
              </Div>
              that I worked on.
            </Div>
            <Div
            align
                className={styles.user_button}
              >
            <Div row align className={styles.user_button_container}>
              For more see:
              <Div
                align
                className={styles.user_button}
                onClick={onClickAboutMe}
              >
                About me
                <Underline isFirstTime={isFirstTime} />
              </Div>
              and
              <Div
                align
                className={styles.user_button}
                onClick={onClickEducation}
              >
                Education.
                <Underline isFirstTime={isFirstTime} />
              </Div>
            </Div>
            </Div>

            <ContactComponent className={styles.contact_container} />
          </Div>
        ))
      }
    </Transition>
  );
};

const Underline = ({ isFirstTime }) => (
  <Transition
    items={true}
    from={{
      transform: isFirstTime ? "scale(0)" : "scale(1)"
    }}
    enter={{
      transform: "scale(1)"
    }}
    config={{ delay: 800 }}
  >
    {showUnderline =>
      (props => (
        <div
          style={props}
          className={`${styles.underline} ${styles.show_underline}`}
        ></div>
      ))
    }
  </Transition>
);


export default memo(HeaderDescription);
