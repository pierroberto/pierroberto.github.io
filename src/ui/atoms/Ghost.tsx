import React from 'react';
import './ghost.css';
export const Ghost: React.FC = () => {
  return (
    <div style={{ scale: '0.1' }}>
      <div id="wrapper">
        <div className="frame">
          <div className="illustration">
            <div className="row-head-ghost">
              <div className="head-ghost base-color line1"></div>
              <div className="head-ghost base-color line2"></div>
              <div className="head-ghost base-color line3"></div>
              <div className="head-ghost base-color line4"></div>
            </div>

            <div className="body-ghost base-color">
              <div className="wrap-eyes-ghost">
                <div className="eye-ghost eye-left">
                  <div className="row-retina">
                    <div className="pupil-ghost"></div>
                  </div>
                </div>
                <div className="eye-ghost eye-right">
                  <div className="row-retina">
                    <div className="pupil-ghost"></div>
                  </div>
                </div>
              </div>
            </div>

            <ul className="ghost-foot">
              <li className="a-left">
                <div className="base-color line1"></div>
                <div className="base-color line2"></div>
              </li>

              <li>
                <div className="base-color line1"></div>
                <div className="base-color line2"></div>
              </li>

              <li className="a-right">
                <div className="base-color line1"></div>
                <div className="base-color line2"></div>
              </li>
            </ul>
          </div>

          <div className="wrapper-cookies">
            <div className="row-cookies">
              <div className="cookie"></div>
              <div className="cookie"></div>
              <div className="cookie"></div>
              <div className="cookie"></div>
              <div className="cookie"></div>
              <div className="cookie"></div>
              <div className="cookie"></div>
              <div className="cookie"></div>
              <div className="cookie"></div>
              <div className="cookie"></div>
              <div className="cookie"></div>
              <div className="cookie"></div>
              <div className="cookie"></div>
              <div className="cookie"></div>
              <div className="cookie"></div>
              <div className="cookie"></div>
              <div className="cookie"></div>
              <div className="cookie"></div>
              <div className="cookie"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
