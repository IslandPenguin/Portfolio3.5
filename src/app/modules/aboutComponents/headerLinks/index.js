import React, { memo, useState } from "react";
import { useSpring, useTransition, animated } from "react-spring";
import styles from "./header_links.module.scss";
import { landingPageBody } from "Constants/landingConstants";
import ContactComponent from "Common/components/contactComponent";
import Div from "Common/components/div";

const HeaderLinks = ({
  isFullScreen,
  bodyType,
  onClickTimeline,
  onClickProject,
  onClickAboutMe,
  onClickEducation
}) => {
  const [showMenu, setMenuState] = useState(false);
  const transition = useTransition(isFullScreen, null, {
    from: {
      opacity: 0,
      transform: "translateY(-20px)"
    },
    enter: {
      opacity: 1,
      transform: "translateY(0px)"
    },
    leave: {
      opacity: 0,
      transform: "translateY(-20px)"
    }
    // config: { delay: isFullScreen ? 600 : 0 }
  });

  let transformUnderline = "translateX(77px)";
  let underlineWidth = 37;
  if (bodyType === landingPageBody.TIMELINE) {
    transformUnderline = "translateX(0px)";
    underlineWidth = 62;
  } else if (bodyType === landingPageBody.ABOUT_ME) {
    transformUnderline = "translateX(125px)";
    underlineWidth = 72;
  } else if (bodyType === landingPageBody.EDUCATION) {
    transformUnderline = "translateX(213px)";
    underlineWidth = 72;
  }

  const springProps = useSpring({
    transformUnderline: transformUnderline,
    underlineWidth: underlineWidth,
  });

  return transition.map(
    ({ item, props: transitionProps }) =>
      !item && (
        <Div
          key="header-container"
          animate
          row
          align
          justify="space_between"
          style={transitionProps}
          className={`${styles.header_container} ${
            showMenu ? styles.header_container__increase_index : ""
          }`}
        >
          <Div            
            className={`${styles.hamburger_menu} ${
              showMenu ? styles.hamburger__selected : ""
            }`}
            onClick={() => setMenuState(!showMenu)}
          >
            <div className={styles.hamburger_row}></div>
            <div className={styles.hamburger_row}></div>
          </Div>

          {showMenu && (
            <div
              className={styles.bubble_backdrop}
              onClick={() => setMenuState(!showMenu)}
            >
              <Div
                align
                row
                className={styles.speech_bubble_container}
                onClick={event => event.stopPropagation()}
              >
                <ContactComponent />
              </Div>
            </div>
          )}

          <ContactComponent isWhite className={styles.contact_container} />

          <Div className={`${styles.header_link_container}`}>
            <Div row className={styles.bodytype_container}>
              <div
                className={styles.header_link_button}
                onClick={onClickTimeline}
              >
                Timeline
              </div>
              <div
                className={styles.header_link_button}
                onClick={onClickProject}
              >
                Tech
              </div>
              <div
                className={styles.header_link_button}
                onClick={onClickAboutMe}
              >
                About Me
              </div>
              <div
                className={styles.header_link_button}
                onClick={onClickEducation}
              >
                Education
              </div>
            </Div>
            <animated.div
              style={{
                transform: springProps.transformUnderline,
                width: springProps.underlineWidth
              }}
              className={styles.underline}
            ></animated.div>
          </Div>
        </Div>
      )
  );
};

export default memo(HeaderLinks);
