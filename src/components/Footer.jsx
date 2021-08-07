import React, { useEffect, useState } from "react";
import FooterBg from "../assets/bg-globeeek.png";
import FooterChatbot from "../assets/footer-chatbot.png";

import UIkit from "uikit";

export default function Footer() {
  const [footerActive, setFooterActive] = useState(true);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    UIkit.drop(".chatbot__content-container", {
      mode: "click",
    }).show();
  }, []);

  function handleScroll() {
    if (window.pageYOffset > document.body.scrollHeight / 2) {
      setFooterActive(true);
    } else {
      setFooterActive(false);
    }
  }
  return (
    <>
      <div
        className={`footer uk-width-1-1 ${
          footerActive ? "active" : ""
        } uk-position-fixed`}
      >
        <div className="footer__container uk-width-3-4 uk-margin-auto uk-flex uk-flex-between uk-flex-middle">
          <div className="footer__title-container">
            <h5 className="footer__subtitle uk-margin-remove">
              Explore the report
            </h5>
            <h2 className="footer__title uk-text-large uk-margin-remove">
              Global Index
            </h2>
          </div>
          <div className="footer__banner">
            <img src={FooterBg} alt="" />
          </div>
        </div>
      </div>
      <div className="chatbot uk-position-fixed">
        <div className="chatbot-container">
          <img src={FooterChatbot} alt="" />
        </div>
      </div>
      <div
        uk-drop="mode: click"
        className="chatbot__content-container uk-position-fixed"
      >
        <div className="uk-card uk-card-body uk-card-default chatbot__content">
          <button
            className="uk-drop-close chatbot__content-close"
            type="button"
            data-uk-close
          ></button>
          <p>Are you looking for air freight and ocean freight quotes?</p>
          <a href="/#" className="chatbot__findout uk-flex uk-flex-center">
            Find out more
          </a>
        </div>
      </div>
    </>
  );
}
